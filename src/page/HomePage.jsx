export default function HomePage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-white text-center">
        <h1 className="mt-2 text-2xl">You travel the world.</h1>
        <h1 className="mt-2 text-2xl">
          WorldWise keeps track of your adventures.
        </h1>
        <h2 class="mt-4">
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <a class="button text-white mt-2 " href="/login">
          Start tracking now
        </a>
      </section>
    </>
  );
}
