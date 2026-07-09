"use client"

import Image from "next/image"
import { Calendar, Code2, ExternalLink, Globe, Smartphone } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import {
  Project,
  ProjectType,
  StoreType,
} from "@/components/types/project"


export function ProjectCard({
  project,
}: {
  project: Project
}) {
  return (
    <Card
      className={cn(
        "group relative h-70 w-2xl overflow-hidden rounded-2xl border-0",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      )}
    >

      {/* Banner */}
      <Image
        src={project.banner}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />


      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0
          bg-linear-to-b
          from-black/50
          via-black/70
          to-black/90
        "
      />


      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-5 text-white">


        {/* Header */}
        <div className="flex items-center gap-3">


          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-white/15
            "
          >
            {project.icon}
          </div>


          <h3
            className="
              truncate
              text-xl
              font-bold
            "
          >
            {project.title}
          </h3>

        </div>



        {/* Description */}
        <p
          className="
            mt-3
            line-clamp-2
            text-sm
            text-white/90
          "
        >
          {project.description}
        </p>



        {/* Technologies */}
        <div
          className="
            mt-3
            flex
            flex-wrap
            gap-2
          "
        >
          {project.technologies
            .slice(0,4)
            .map((tech)=>(
              <span
                key={tech}
                className="
                  rounded-lg
                  bg-white/15
                  px-3
                  py-1
                  text-xs
                  font-semibold
                "
              >
                {tech}
              </span>
            ))
          }
        </div>



        {/* Bottom */}
        <div
          className="
            mt-auto
            flex
            items-center
            gap-3
            text-sm
            text-white/70
          "
        >


          {/* Type */}
          <div className="flex items-center gap-1">
            {
              project.type === ProjectType.APP
              ?
              <Smartphone size={16}/>
              :
              <Globe size={16}/>
            }

            <span>
              {project.type.toUpperCase()}
            </span>
          </div>



          {/* Year */}
          {
            project.year &&
            <div className="flex items-center gap-1">
              <Calendar size={15}/>
              <span>
                {project.year}
              </span>
            </div>
          }



          <div className="ml-auto flex items-center gap-2">


            {/* Github */}
            {
              project.githubUrl &&
              <ActionButton
                href={project.githubUrl}
              >
                <Code2 size={18}/>
              </ActionButton>
            }



            {/* Demo */}
            {
              project.liveDemoUrl &&
              <ActionButton
                href={project.liveDemoUrl}
              >
                <ExternalLink size={18}/>
              </ActionButton>
            }



            {/* Stores */}
            {
              project.downloadLinks.map((download)=>(
                <StoreButton
                  key={download.url}
                  download={download}
                />
              ))
            }


          </div>

        </div>

      </div>

    </Card>
  )
}




function ActionButton({
  href,
  children,
}:{
  href:string
  children:React.ReactNode
}){

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-white/10
        transition
        hover:bg-white/20
      "
    >
      {children}
    </a>
  )
}




function StoreButton({
  download,
}:{
  download:{
    store:StoreType
    url:string
  }
}){


  let icon



  switch(download.store){

    case StoreType.MYKET:
      icon =
      <Image
        src="./myket-get-en.png"
        alt="Myket"
        width={150}
        height={50}
        className="object-contain"
      />
      break


    case StoreType.BAZAAR:
      icon =
      <Image
        src="./get-cafebazaar-en.png"
        alt="Cafe Bazaar"
        width={150}
        height={50}
        className="object-contain"
      />
      break


    case StoreType.GOOGLE_PLAY:
      icon =
      <Image
        src="./google-paly-download.svg"
        alt="Google Play"
        width={150}
        height={50}
      />
      break
  }



  return (
    <a
      href={download.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex
        items-center
        justify-center
        transition
        hover:scale-110
      "
    >
      {icon}
    </a>
  )
}


const projects: Project[] = [
 {
   title:"قرص یاد",
   description:"A spaced repetition learning application",
   banner:"./ghors_yad_banner.jpg",
   icon:<Image src="./ghors_yad_logo.png" width={32} height={32} alt=""/>,
   type:ProjectType.APP,
   technologies:[
     "Flutter",
     "Dart",
     "MVVM"
   ],
    downloadLinks:[
     {
       store:StoreType.MYKET,
       url:"https://myket.ir/app/ir.ehsan.ghorsyad"
     },
     {
       store:StoreType.BAZAAR,
       url:"https://cafebazaar.ir/app/ir.ehsan.ghorsyad"
     },
   ],
   screenshots:[],
   featured:true,
   year:2026
 },
]


export default function ProjectsSection() {
  return (
    <section className="mt-16 w-full px-4">

      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold">
          Projects
        </h2>

        <p className="mt-2 max-w-xl text-muted-foreground">
          A collection of applications and websites I have built using modern technologies.
        </p>
      </div>


      <div className="flex flex-wrap justify-center gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>

    </section>
  )
}