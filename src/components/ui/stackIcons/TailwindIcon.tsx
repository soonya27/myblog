import Image from 'next/image';
import iconImg from '../../../../public/DevelopeSkillIcon/TailwindCSS-Light.svg';


export default function TailwindIcon() {
    return (
        <Image src={iconImg} alt="tailwindCss" width={30} height={30} className='w-full' />
    );
}

