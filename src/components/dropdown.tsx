'use client';

import React, {Fragment} from 'react';
import Link from 'next/link';
import {Menu, Transition} from '@headlessui/react';

interface DropdownProps {
  btn: React.ReactNode;
  btnClassName: string;
  options: {
    label: string;
    isLink: boolean;
    href?: string;
    onClick?: () => void;
  }[];
}

export default function Dropdown({btn, btnClassName, options}: DropdownProps) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            id="menu"
            className={btnClassName}
            aria-label="Menu"
            onClick={e => e.stopPropagation()}
          >
            {btn}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-grey shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#27272A]">
            <div className="px-1 py-1">
              {options?.map((option, index) => (
                <Menu.Item key={index}>
                  {({active}: {active: boolean}) => {
                    const OptionComponent = option.isLink ? Link : 'button';

                    return (
                      <OptionComponent
                        href={
                          option.isLink ? `/${option.href?.toLowerCase()}` : ''
                        }
                        className={`${
                          active ? 'bg-[#24242D] text-white' : 'text-white'
                        } flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={e => {
                          e.stopPropagation();
                          if (!option.isLink) {
                            option.onClick?.();
                          }
                        }}
                      >
                        {option.label}
                      </OptionComponent>
                    );
                  }}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
