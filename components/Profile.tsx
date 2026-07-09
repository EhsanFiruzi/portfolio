import Image from "next/image";

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center">
      <Image
      src="./profile.jpg"
      alt="Profile"
      width={160}
      height={160}
      className="mt-10 rounded-full object-cover"
/>

      <h1 className="mt-5 text-2xl font-bold">
        Ehsan
      </h1>

      <h2 className="mt-2 text-lg font-medium text-muted-foreground">
        Full-Stack Developer
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        I am a full-stack developer passionate about building modern,
        scalable applications. I work with Flutter for mobile development,
        Python and FastAPI for backend systems, and modern web technologies
        like Next.js.
        <br />
        I enjoy creating clean architectures, solving complex problems,
        and developing efficient software solutions.
      </p>
    </div>
  );
}

export default Profile;