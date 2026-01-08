import { useEffect, useMemo, useState } from "react";

import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BeforeInstallPromptEvent extends Event {
 prompt: () => Promise<void>;
 userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const DISMISSED_KEY = "pwa_install_prompt_dismissed_v1";

const isStandalone = () => {
 if (window.matchMedia?.("(display-mode: standalone)").matches) return true;
 const navigatorAny = navigator as unknown as { standalone?: boolean };
 return Boolean(navigatorAny.standalone);
};

export default function PWAInstallPrompt() {
 const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
 const [open, setOpen] = useState(false);

 const shouldBlock = useMemo(() => {
  if (typeof window === "undefined") return true;
  if (isStandalone()) return true;
  return localStorage.getItem(DISMISSED_KEY) === "1";
 }, []);

 useEffect(() => {
  const onBeforeInstallPrompt = (e: Event) => {
   if (shouldBlock) return;
   const evt = e as BeforeInstallPromptEvent;
   e.preventDefault();
   setDeferredPrompt(evt);
   setOpen(true);
  };

  const onAppInstalled = () => {
   setOpen(false);
   setDeferredPrompt(null);
  };

  window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  window.addEventListener("appinstalled", onAppInstalled);

  return () => {
   window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
   window.removeEventListener("appinstalled", onAppInstalled);
  };
 }, [shouldBlock]);

 const onInstall = async () => {
  if (!deferredPrompt) return;

  await deferredPrompt.prompt();

  try {
   const choice = await deferredPrompt.userChoice;
   if (choice.outcome === "dismissed") {
    localStorage.setItem(DISMISSED_KEY, "1");
   }
  } finally {
   setOpen(false);
   setDeferredPrompt(null);
  }
 };

 const onLater = () => {
  localStorage.setItem(DISMISSED_KEY, "1");
  setOpen(false);
 };

 if (!deferredPrompt || shouldBlock) return null;

 return (
  <AlertDialog open={open} onOpenChange={setOpen}>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>تثبيت التطبيق</AlertDialogTitle>
     <AlertDialogDescription>
      لتجربة أسرع وبدون شريط روابط، قم بتثبيت التطبيق على جهازك.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel onClick={onLater}>لاحقاً</AlertDialogCancel>
     <AlertDialogAction onClick={onInstall}>تثبيت الآن</AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}
