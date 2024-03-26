import iconImg from '../../../../public/DevelopeSkillIcon/JQuery.svg';
import Image from 'next/image';

export default function JqueryIcon() {
    return (
        <Image src={iconImg} alt="jquery" width={30} height={30} className='w-full' />
    );
}

