import iconImg from '../../../../public/DevelopeSkillIcon/React-Light.svg';
import Image from 'next/image';

export default function ReactIcon() {
    return (
        <Image src={iconImg} alt="react" width={60} height={60} className='w-full ' />
    );
}

