import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { ZodLogin, type LoginDataForm } from "./Login.validation";
import { sendUserLogin } from "./login.api";
import { useContext } from "react";
import { AuthContext } from "../../context/CounterContext/AuthContext/AuthContext";

export default function Login() {
  // 1. استدعاء setUserToken من الـ Context
  const { getUserData, setuserData, setUserToken } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginDataForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(ZodLogin),
  });

  const navigator = useNavigate();

  async function SayHello(userData: LoginDataForm) {
    console.log("Form Data:", userData);
    toast.promise(sendUserLogin(userData), {
      loading: "wait wait...",
      success: function (x) {
        const token = x.data.token || x.data.data?.token || "";
        
        // 2. حفظ التوكين في الـ localStorage والتحديث في الـ State فوراً
        localStorage.setItem("tkn", token);
        setUserToken(token); // السطر ده هو السر اللي هيخلّي النافبار يحدّث فوراً

        getUserData().then(function (data) {
          setuserData(data);
        });

        reset();
        navigator("/Post");
        return <h1 className="text-emerald-500 capitalize">{x.data.message}</h1>;
      },
      error: function (x: Error) {
        return <h1 className="text-red-600 capitalize">{x.message}</h1>;
      },
    });
  }

  return (
    <div className="flex justify-center py-30 items-center min-h-screen bg-linear-to-r from-[#09c] to-[#021]">
      <Form
        onSubmit={handleSubmit(SayHello)}
        className="flex bg-white outline-4 outline-sky-300 dark:bg-sky-900 dark:text-white lg:min-w-2xl shadow-2xl p-10 rounded-xl flex-col gap-4"
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>

        {/* email Input */}
        <TextField isRequired type="email" isInvalid={!!errors.email}>
          <Label>email</Label>
          <Input
            {...register("email")}
            className="focus:ring-amber-300"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </TextField>

        {/* password Input */}
        <TextField isRequired type="password" isInvalid={!!errors.password}>
          <Label>password</Label>
          <Input
            {...register("password")}
            className="focus:ring-amber-300"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </TextField>

        <div className="flex flex-col gap-2">
          <Button className="w-full  bg-emerald-950 text-emerald-400 border border-emerald-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75" type="submit" isPending={isSubmitting}>
            {isSubmitting ? (
              <Spinner color="current" size="lg" />
            ) : (
              <>
                <Check size="24" color="#ff5f" variant="Linear" /> Submit
              </>
            )}
          </Button>
          <Button className="w-full text-red-700 text-[20px]" type="reset" variant="danger">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}