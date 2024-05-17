type Props = {
  name: string;
};

export default function WorkInProgress({ name }: Props) {
  return (
    <div className="h-full flex justify-center items-center rounded-lg text-black bg-slate-200 ">
      🚧 {name} 공사중 🚧
    </div>
  );
}
