import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import DashboardIcon from '../../images/sidebarIcon/DashboardIcon';
import logo from '../../assets/tizara.png';
import HistoryIcon from '../../images/sidebarIcon/HistoryIcon';
import StakeNowIcon from '../../images/sidebarIcon/StakeNowIcon';
import RewardIcon from '../../images/sidebarIcon/RewardIcon';
import StackNowIcon from '../../images/sidebarIcon/StackNowIcon';
import DownArrow from '../../assets/icon/DownArrow';
import { PiCrownBold, PiSelectionBackgroundBold } from 'react-icons/pi';
import { SiSinglestore } from "react-icons/si";

import { TiGroup } from 'react-icons/ti';
import { MdOutlineGroupAdd } from 'react-icons/md';
import MyContext from '../../hooks/MyContext';
import { IoTicketOutline } from 'react-icons/io5';
import { FaRegUser, FaScrollTorah } from 'react-icons/fa6';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  const { profile } = useContext(MyContext);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);



  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-67 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2 lg:py-2.5">
        <NavLink to="/dashboard">
          {/* <h1 className="text-3xl font-semibold text-white">Tizara</h1> */}
          <img className="h-15" src={logo} alt="" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-0 py-4 px-4 lg:mt-0 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' || pathname.includes('dashboard')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </li>

              <SidebarLinkGroup
                activeCondition={
                  pathname === '/store-nft' || pathname.includes('store-nft')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group  relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/store-nft' ||
                          pathname.includes('store-nft')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <HistoryIcon />
                        Store NFT
                        <DownArrow open={open} />
                      </NavLink>

                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/store-nft/buy-nft"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Purchase NFT
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/store-nft/nft-histor_y"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              NFT Purchase History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/store-nft/nft-level-bonus"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              NFT Level Bonus
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/store-nft/nft-roi"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              NFT Reward
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/store-nft/nft-roi-profit-bounty"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              NFT Profit Bounty
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/stack-coin"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/stack-coin' ||
                    pathname.includes('/stack-coin')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  <StakeNowIcon />
                  Stake Now
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-stack-coin"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/my-stack-coin' ||
                    pathname.includes('my-stack-coin')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  {/* <StackNowIcon /> */}
                  <SiSinglestore />

                  Stake History
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/my-stack-logs"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/my-stack-logs' ||
                    pathname.includes('my-stack-logs')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  <StackNowIcon />
                  Omega Stake Logs
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/stake-logs-roi"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/stake-logs-roi' ||
                    pathname.includes('stake-logs-roi')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  <PiSelectionBackgroundBold />
                  Omega Stake reward
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/my-referrals"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/my-referrals' ||
                    pathname.includes('my-referrals')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  <MdOutlineGroupAdd />
                  My Referrals
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/my-team"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/my-team' || pathname.includes('my-team')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  {/* <RefferalIcon /> */}
                  <TiGroup />
                  My Team Stake
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/stake-reward"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/stake-reward' ||
                    pathname.includes('stake-reward')) &&
                    'bg-graydark dark:bg-meta-4'
                    }'
                    }`}
                >
                  <RewardIcon />
                  Level Reward
                </NavLink>
              </li>

              {/* Users start */}

              <SidebarLinkGroup
                activeCondition={
                  pathname === '/history' || pathname.includes('history')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/history' ||
                          pathname.includes('history')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <HistoryIcon />
                        History
                        <DownArrow open={open} />
                      </NavLink>

                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/history/transaction-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Transaction History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/buy-token-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Buy Token History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/deposit-wallet-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Deposit History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/roi-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Reward History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/logs-profit-bounty-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Omega Stake Logs Bounty
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/profit-bounty-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Profit Bounty
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/history/transfer-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Transfer History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/history/withdraw-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Bridge History
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/history/usd-transfer-history"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              USD Withdraw History
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Users */}

              {profile?.isSpecialRcm && (
                <li>
                  <NavLink
                    to="/special-rcm"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/special-rcm' ||
                      pathname.includes('/special-rcm')) &&
                      'bg-graydark dark:bg-meta-4'
                      }'
                    }`}
                  >
                    {/* <StakeNowIcon /> */}
                    <FaScrollTorah />

                    Special Rcm
                  </NavLink>
                </li>
              )}


              {profile?.rank && (
                <li>
                  <NavLink
                    to="/rank-bonus"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/rank-bonus' ||
                      pathname.includes('/rank-bonus')) &&
                      'bg-graydark dark:bg-meta-4'
                      }'
                    }`}
                  >
                    <PiCrownBold />
                    Rank Bonus
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <FaRegUser />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('support') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <IoTicketOutline className="text-md" />
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
