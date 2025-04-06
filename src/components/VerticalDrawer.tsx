import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { Archive, Delete, Edit, MoreVerticalIcon } from "lucide-react";

export default function VerticalDrawer({
  handleEdit,
  handleDelete,
  handleArchive,
  handleUnArchive,
  postData = {},
}: any) {
  console.log(postData);
  const solutions = [
    {
      name: "Edit",
      description: "Edit your post",
      href: "#",
      icon: Edit,
      onClick: handleEdit,
    },
    {
      name: "Delete",
      description: "Delete your post",
      href: "#",
      icon: Delete,
      onClick: handleDelete,
    },
    {
      name: postData.isArchived == "true" ? "UnArchive" : "Archive",
      description:
        postData.isArchived == "true"
          ? "Unarchive your post"
          : "Archive your post",
      href: "#",
      icon: Archive,
      onClick: postData.isArchived == "true" ? handleUnArchive : handleArchive,
    },
  ];

  function handleEditPopUp() {
    handleEdit(postData);
  }

  function handleDeletePopUp() {
    handleDelete(postData);
  }
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
        <span>
          <MoreVerticalIcon />
        </span>
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute z-10 mt-0 flex w-[280px] -translate-x-[240px] px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-full flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
          <div className="p-4">
            {solutions.map((item) => (
              <div
                key={item.name}
                onClick={item.onClick}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="size-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-gray-900">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
