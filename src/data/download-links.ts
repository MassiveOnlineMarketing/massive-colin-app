"use server";

import { db } from "@/lib/db";
import { DownloadPlatform } from "@prisma/client";

export async function getDownloadLinksAction(){
  return await db.downloadLinks.findMany()
}

export async function updateDownloadLinkAction({ key, link }: { key: DownloadPlatform, link: string }) {
  // Keys are hardcoded in the database
  const keys = {
    WINDOWS: 'cm8ofl2db000020g5zqj20wu7',
    MAC: 'cm8ofl2db000120g53sbz1kn2'
  }

  return await db.downloadLinks.update({
    where: {
      id: keys[key]
    },
    data: { link }
  })
}