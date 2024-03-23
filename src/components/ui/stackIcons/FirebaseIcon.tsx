import iconImg from '../../../../public/DevelopeSkillIcon/Firebase-Light.svg';
import Image from 'next/image';

export default function FirebaseIcon() {
    return (
        <Image src={iconImg} alt="firebase" width={30} height={30} className='w-full' />
    );
}

