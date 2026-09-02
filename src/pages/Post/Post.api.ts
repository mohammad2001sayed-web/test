import  axios  from 'axios';
import type { AllPostRisponse, Post } from './Post.interface';

export  async function HandleAllPost():Promise<Post[]> {
    try {
            const res = await axios.get<AllPostRisponse>(`${import.meta.env.VITE_BASE_URL}/posts`,{
        headers:{
          token:  localStorage.getItem('tkn')
        }
    })
    
  return  res.data.data.posts

        
    } catch (error) {
        if (axios.isAxiosError<{message:string}>(error)) {

            throw new Error (error.response?.data.message)
            
        }
                    throw new Error ("network errorr")

        
    }
}
