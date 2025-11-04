import Link from 'next/link';
import UserNav from './users/UserNav';
export default function NavBar() {

return (
<div className="flex items-center justify-between bg-gray-100 shadow-md px-6">
  {/* Meniu principal */}
  <ul className="flex gap-6">
    <li><Link href="/">Home</Link></li>
    <li><Link href="/explore">Explore Sites</Link></li>
    <li><Link href="/map">Map Sites</Link></li>
    <li><Link href="/wing-up">User area</Link></li>
  </ul>

  {/* Butoane Login/Register */}
  <div className="flex gap-4">
    
    <UserNav />
  </div>
</div>

);
}