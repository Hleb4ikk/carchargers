import Logo from "@/components/Logo";

import NavMenu from "@/components/NavMenu/NavMenu";

const Header = () => {
  return (
    <header className="bg-green-50">
      <div className="mx-auto max-w-[1440px] p-4">
        <div className="flex items-center gap-4">
          <Logo className="size-20 fill-green-700" />
          <h1 className="text-green-700 font-bold text-3xl">GreenPower</h1>
        </div>
        <div>
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
