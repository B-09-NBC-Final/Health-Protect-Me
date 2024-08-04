import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/icons/Vector.svg';
import githubIcon from '@/assets/icons/icon_git.png';
import instagramIcon from '@/assets/icons/icon_instar.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white z-10 absolute bottom-0 left-0 p-6">
      <div className="inner_wrap flex items-center justify-between px-10 py-4">
        <div className="flex items-center p-6 gap">
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={100} height={28} />
          </Link>
          <div className="flex space-x-4 ml-4 p-4 ">
            <Image src={githubIcon} alt="GitHub" width={24} height={24} />
            <Image src={instagramIcon} alt="Instagram" width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="inner_wrap">
        <p className="text-sm text-color-gray px-6">P리부는P리</p>
        <p className="text-sm text-color-gray px-6">Copyright 2024. HELPME. All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
