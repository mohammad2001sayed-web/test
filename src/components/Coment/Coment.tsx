import { Avatar, Card } from "@heroui/react";
import type { TopComment2 } from "../../pages/Post/Post.interface";

export default function Coment( {comment}:{comment:TopComment2}) {
    const {commentCreator:{name,photo},createdAt,content,image}= comment
  return (
    <>
    
    <Card className="w-full bg-violet-300 dark:bg-[#18181B]">
      <Card.Header>
        <Card.Title className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-blue-900">
            <Avatar>
        <Avatar.Image alt="John Doe" src={photo} />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <div>
        <h2>{name}</h2>
        <p>{new Date (createdAt).toLocaleDateString().replace(/\//g,'-')}</p>
      </div>
        </Card.Title>   
        <div>
         {image && <img className="w-full" src={image} alt={name} />}
        <p className="wrap-break-word whitespace-normal text-black dark:text-white overflow-wrap-break-word">
          {content}
        </p>
        </div>
      </Card.Header>
      <Card.Footer className="py3 mt-3 border-t border-violet-500">
      </Card.Footer>
    </Card>
    </>
  )
}
