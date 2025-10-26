import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  NAVIGATION_ITEMS,
  SUB_NAVIGATION_ITEMS,
  PERSONAL_NAVIGATION_ITEMS,
  DATA_INTEGRATION_NAV,
} from "../constants";
import { useTheme } from "./ThemeContext";
import { View, AlertLevel } from "../types";
import { allActiveAlerts } from "../services/mockData";
import NotificationDropdown from "./header/NotificationDropdown";
import { BellAlertIcon } from "./icons/Icons";

const Sidebar = ({
  activeView,
  setActiveView,
  isOpen,
  setIsOpen,
  horizontal = false,
  onNavigateToRegion,
}) => {
  const NavLink = ({ item, extraClasses }) => {
    const isActive = activeView === item.id;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveView(item.id);
          setIsOpen(false);
        }}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-gray-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        } ${extraClasses || ""}`}
      >
        <span className="mr-3">{item.icon}</span>
        {item.label}
      </a>
    );
  };

  const { isAdmin } = useTheme();
  if (horizontal) {
    const { useIntegration } = useTheme();
    const notificationsRef = useRef(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const highPriorityAlerts = useMemo(
      () =>
        useIntegration
          ? []
          : allActiveAlerts.filter(
              (a) =>
                a.level === AlertLevel.Critical || a.level === AlertLevel.High
            ),
      [useIntegration]
    );

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          notificationsRef.current &&
          !notificationsRef.current.contains(event.target)
        ) {
          setIsNotificationsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
      ...NAVIGATION_ITEMS,
      ...SUB_NAVIGATION_ITEMS,
      ...PERSONAL_NAVIGATION_ITEMS,
      ...(isAdmin ? DATA_INTEGRATION_NAV : []),
    ];

    return (
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 z-10">
        <div className="px-4 sm:px-6">
          <div className="flex items-stretch py-1 gap-2">
            <div className="flex flex-1 items-stretch w-full gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  extraClasses="flex-1 justify-center text-center px-3 py-2 truncate"
                />
              ))}
            </div>
            <div className="relative flex items-center" ref={notificationsRef}>
              <button
                className="relative p-1"
                aria-label="Notifications"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                aria-expanded={isNotificationsOpen}
              >
                {highPriorityAlerts.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                )}
                <BellAlertIcon className="h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300" />
              </button>
              {isNotificationsOpen && (
                <NotificationDropdown
                  alerts={highPriorityAlerts}
                  onNavigate={(view) => {
                    setActiveView(view);
                    setIsNotificationsOpen(false);
                  }}
                  onNavigateToRegion={(region) => {
                    if (onNavigateToRegion) {
                      onNavigateToRegion(region);
                    }
                    setIsNotificationsOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 w-64 flex-shrink-0 bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-700/50 flex flex-col p-4 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center mb-6 px-2">
          <img
            src="/logo.png"
            alt="Logo Kemenko PMK"
            className="h-12 w-10 mr-3"
          />
          <div className="text-gray-800 dark:text-slate-100">
            <p className="font-bold text-lg leading-tight">CERIA</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Sistem Pendukung Keputusan Cerdas
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Analisis & Laporan
            </h3>
            <div className="space-y-1">
              {SUB_NAVIGATION_ITEMS.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Personal
            </h3>
            <div className="space-y-1">
              {PERSONAL_NAVIGATION_ITEMS.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>
          </div>

          {isAdmin && (
            <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Admin
              </h3>
              <div className="space-y-1">
                {DATA_INTEGRATION_NAV.map((item) => (
                  <NavLink key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
