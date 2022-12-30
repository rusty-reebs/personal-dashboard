export default function Note() {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">Notes</p>
      <div className="">
        <textarea></textarea>
      </div>
    </div>
  );
}
