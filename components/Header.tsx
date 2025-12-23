'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input, Button, Avatar } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleLogout() {
    // TODO: replace with real logout logic
    console.log('logout');
    router.push('/');
  }

  return (
    <div className="bg-white dark:bg-base-800 px-4 sm:px-6 md:px-8 lg:px-10 py-2 shadow-sm flex flex-row items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logo-word.png"
            alt="logo"
            width={96}
            height={64}
          />
        </Link>
      </div>

      <div className="justify-center flex flex-1 px-4">
        <Input
          aria-label="Search"
          placeholder="Search Photos..."
          value={query}
          onValueChange={setQuery}
          startContent={<SearchIcon className="w-4 h-4 text-muted" />}
          classNames={{ mainWrapper: 'w-full max-w-[600px] flex-shrink-0' }}
        />
      </div>

      <div className="justify-end gap-3 flex flex-row items-center">
        {/* <Dropdown>
          <DropdownTrigger>
            <Avatar name="Guest" src="/images/avatar.png" />
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem
              key="my-photos"
              onPress={() => router.push('/my-photos')}
            >
              My Photos
            </DropdownItem>
            <DropdownItem key="logout" onPress={handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}

        {/* Login Button */}
        <Link href="/login">
          <Button variant="bordered" size="sm">
            Login
          </Button>
        </Link>

        {/* Register Button */}
        <Link href="/register">
          <Button variant="solid" size="sm">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
