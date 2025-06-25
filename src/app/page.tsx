export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-neutral-background">
      <h1 className="text-5xl font-extrabold text-text-heading mb-4">
        Welcome to <span className="text-button-primary">Eventverse</span>
      </h1>
      <p className="text-lg max-w-xl text-text-body">
        Eventverse is your modern solution to smart event management. <br />
        Create, customize, and manage events with ease.
      </p>

      <div className="mt-6">
        <a
          href="/login"
          className=" animate-pulse px-6 py-3 rounded-lg bg-button-primary text-white hover:bg-button-hover transition duration-300 font-medium shadow-md"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
