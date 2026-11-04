import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link, useRouter, usePathname con el locale ya resuelto.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
