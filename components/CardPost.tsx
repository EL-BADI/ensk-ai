import Image from "next/image";
import { Meteors } from "./ui/Meteors";
import { cn, formatDate } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { DeleteIcon, Trash } from "lucide-react";
import axios from "axios";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

function MeteorsDemo(
  props: Post & {
    user: User;
  }
) {
  return (
    <div className="">
      <div className=" w-full relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="font-bold text-2xl text-white mb-4 relative z-50">
            {props.title}
          </h1>

          <div className=" flex items-center gap-4 mb-5 mt-2">
            <Image
              width={40}
              height={40}
              className=" rounded-full"
              src={props.user.image as string}
              alt="author image"
            />
            <p>{props.user.name}</p>
          </div>

          <Link
            href={`/posts/${props.slug}`}
            className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
          >
            Explore
          </Link>
          <p className=" absolute bottom-0 right-0 font-semibold tracking-widest p-5">
            {formatDate(props.createdAt)}
          </p>
          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}

const CardPost = (
  props: Post & {
    canDelete?: boolean;
    user: User;
  }
) => {
  return (
    <div
      className={cn(
        "grid items-center relative grid-cols-[300px_1fr] gap-x-3 mb-6",
        !props.img && "grid-cols-1"
      )}
    >
      {props.canDelete && (
        <form
          className="absolute top-0 right-0 z-10"
          action={async () => {
            "use server";
            const session = await auth();
            if (session?.user?.email !== props.user.email) return;

            await db.post.delete({
              where: {
                id: props.id,
              },
            });
            revalidatePath("/my-posts");
          }}
        >
          <Button
            type="submit"
            className="gap-1 text-rose-500 font-bold m-3 bg-slate-700 "
          >
            Delete
            <Trash className=" w-4 h-4" />
          </Button>
        </form>
      )}
      {props.img && (
        <div className="w-full h-[235px] relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={props.img}
            alt="post image"
            fill
            className=" object-cover"
          />
        </div>
      )}
      <MeteorsDemo {...props} />
    </div>
  );
};

export default CardPost;
