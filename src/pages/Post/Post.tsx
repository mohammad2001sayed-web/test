import { useContext} from "react";
import type { Post } from "./Post.interface";
import { HandleAllPost } from "./Post.api";
import Loding from "../../components/Loding/Loding";
import PostCard from "./PostCard/PostCard";
import  { AuthContext } from "../../context/CounterContext/AuthContext/AuthContext";
import CreatePost from "./CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";

export default function Post() {

  // const [allpost, setallpost] = useState<null | Post[]>(null)

 const {userData}= useContext(AuthContext)


  // useEffect(() => {
  //  HandleAllPost().then( data => setallpost(data))
  
  // }, [])
  const {data,isLoading,isError,error} = useQuery({
    queryKey:['allPost'],
    queryFn:()=>HandleAllPost()
  })
  console.log(data);

  if (isLoading) {
    return <Loding/>
    
  }
  if (isError) {
    return <h1 className="text-9xl text-red-700">{error.message}</h1>
    
  }
  
  
  return <>
  
  <div className="dark:bg-slate-900 bg-[#0b957a]">
      {userData &&  <div className="pt-20 lg:w-6/12 mx-auto flex flex-col gap-3 justify-center items-center "> 
    <CreatePost user={userData}/>
    {data?.map(e => <PostCard key={e._id} post={e}/>)}
  </div> }

  </div>
  
  
  </>;
}
