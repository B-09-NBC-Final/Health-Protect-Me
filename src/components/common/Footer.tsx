import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/icons/Vector.svg';
import githubIcon from '@/assets/icons/icon_git.png';
import instagramIcon from '@/assets/icons/icon_instar.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white z-10 absolute bottom-0 left-0">
      <div className="inner_wrap flex justify-between items-center px-10 py-4">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" width={100} height={28} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
