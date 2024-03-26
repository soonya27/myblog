import iconImg from '../../../../public/DevelopeSkillIcon/JavaScript.svg';
import Image from 'next/image';

export default function JavascriptIcon() {
    return (
        <Image src={iconImg} alt="javacript" width={30} height={30} className='w-full' />
    );
}

