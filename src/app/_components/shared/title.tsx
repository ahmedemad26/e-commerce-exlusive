export default function Title({
  subTittle,
  tittle,
}: {
  subTittle: string;
  tittle: string;
}) {
  return (
    <div className="section-tittle mb-15">
      <h2 className="font-semibold ps-9  text-red-500 mb-5 relative before:content-[''] before:absolute before:top-1/2 before:start-0 before:-translate-y-1/2 before:w-5 before:h-10 before:bg-red-500 before:rounded-sm">
        {tittle}
      </h2>
      <span className="font-semibold text-4xl">{subTittle}</span>
    </div>
  );
}
