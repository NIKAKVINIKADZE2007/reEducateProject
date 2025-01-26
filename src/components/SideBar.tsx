import { Logo, moon, sun, pfp } from '../assets';

export default function SideBar() {
  return (
    <div className='w-full h-[72px] flex  justify-between bg-[#373B53] tablet:h-[80px] desktop:flex-col desktop:h-screen desktop:w-[103px] desktop:rounded-r-[20px] '>
      <div className='size-[72px] flex justify-center items-center rounded-r-[20px] bg-purpleDark tablet:size-[80px] desktop:size-[103px]'>
        <img className='h-[28px] w-[28px]' src={Logo} alt='logo' />
      </div>
      <div className=' w-full max-w-[101px] mr-[24px] flex justify-between relative items-center tablet:mr-[32px] desktop:mr-0 desktop:mb-8 desktop:flex-col desktop:w-full desktop:h-[103px]'>
        <img src={moon} alt='moon' />
        <div className='absolute right-[50%] top-0 bg-[#494E6E] w-[1px] h-full desktop:h-[1px] desktop:w-full desktop:right-0 desktop:top-[50%]' />
        <img src={pfp} className='rounded-[50%] size-8' alt='profile-picture' />
      </div>
    </div>
  );
}
