import Image from "next/image"

const contactInfo = [
  {
    title: "GitHub",
    link: "https://github.com/EhsanFiruzi",
    icon: "/github.svg",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/ehsan_fullstack?igsh=bTJrb2hobzQyMGU3",
    icon: "/instagram.svg",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/ehsan-firuzi-635721384",
    icon: "/linkedin.svg",
  },
  {
    title: "Telegram",
    link: "https://t.me/Ehsan_Firuzi",
    icon: "/telegram.svg",
  },
]

export default function Contact() {
  return (
    <section className="mt-16 w-full px-4 mb-16" >
      {/* Title */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold">
          Contact Me
        </h2>

        <p className="mt-2 max-w-xl text-muted-foreground">
          Feel free to reach out through any of these platforms.
        </p>
      </div>


      {/* Contact Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {contactInfo.map((contact) => (
          <a
            key={contact.title}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              gap-3
              rounded-xl
              border
              bg-card
              px-5
              py-3
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary/50
              hover:shadow-lg
            "
          >
            <div className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-muted
              transition-transform
              duration-300
              group-hover:scale-110
            ">
              <Image
                src={contact.icon}
                alt={contact.title}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            <span className="font-medium">
              {contact.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}