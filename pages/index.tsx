import { createClient } from "@supabase/supabase-js";

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
};

type Images = {
  images: Image[];
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Gallery: NextPage<Images> = ({images}) => {
  return (
    <>
      <Head>
        <title>Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {/* Images will go here */}
            {images.map((image) => (
              <BlurImage key={image.id} image={image} />
            ))}
          </div>
        </div>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer> */}
    </>
  );
};

function BlurImage({ image }: {image:Image}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image.href} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow=hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn("group-hover:opacity-75 duration-700 ease-in-out", isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100")}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name} </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY || "");

  const { data } = await supabaseAdmin.from("images").select("*").order("id");

  return {
    props: {
      images: data,
    },
  };
};

export default Gallery;
