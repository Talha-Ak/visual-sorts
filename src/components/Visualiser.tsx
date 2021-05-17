interface Props {
  sortArray: number[];
}

const Visualiser = ({sortArray}: Props) => (
  <div className='visual-bars col-span-6 lg:col-span-7 h-[24rem] lg:h-[30rem] flex items-end justify-center space-x-0.5 md:space-x-1 mx-4'>
    {sortArray.map((value, _, array) => (
    <div key={value + Date().toString()} className='w-14 bg-teal-500 dark:bg-teal-600 rounded-tl-md  ' style={{ height: `${(value + 1) / array.length * 100}%` }}></div>
  ))}
</div>
);

export default Visualiser;