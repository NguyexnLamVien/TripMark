export default function Pricing() {
  return (
    <section className="grid grid-cols-2 gap-3 items-center w-[clamp(80rem,80%,90rem)]">
      <div>
        <h2 className="text-7xl mb-4 leading-[3rem]">Simple pricing.</h2>
        <h2 className="text-7xl mb-4 leading-[3rem]">Just $9/month..</h2>
        <p className="mb-[2rem]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
          labore mollitia iusto. Recusandae quos provident, laboriosam fugit
          voluptatem iste.
        </p>
      </div>
      <img
        src="image.png"
        className="flex place-content-center h-[100%]"
        alt="overview of a large city with skyscrapers"
      />
    </section>
  );
}
