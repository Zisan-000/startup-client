import React from "react";
import { getUserSession } from "@/lib/core/session";
import {
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiZap,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Image from "next/image";
import ProfileEditForm from "@/components/ProfileEditForm";

export const dynamic = "force-dynamic";

const CollaboratorProfile = async () => {
  const session = await getUserSession();

  if (!session?.email) {
    return (
      <div className="flex min-h-100 items-center justify-center text-sm text-zinc-500 font-medium">
        Active user authentication session not found. Please log in.
      </div>
    );
  }

  let user = null;
  try {
    const res = await fetch(
      `http://localhost:5000/api/users/profile?email=${session.email}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      user = await res.json();
    }
  } catch (err) {
    console.error("Failed to sync profile from DB:", err);
  }

  if (!user) {
    user = session;
  }

  // 3. Setup dates cleanly
  const signupDate = user.createdAt?.$date
    ? new Date(user.createdAt.$date).toLocaleDateString()
    : user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "Recent";

  const roleThemes = {
    founder: {
      label: "Venture Founder",
      styles: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <FiBriefcase size={12} />,
    },
    admin: {
      label: "System Admin",
      styles: "bg-red-50 text-red-700 border-red-200",
      icon: <FiShield size={12} />,
    },
    collaborator: {
      label: "Collaborator",
      styles: "bg-green-50 text-green-700 border-green-200",
      icon: <FiUser size={12} />,
    },
  };

  const activeRole =
    roleThemes[user.role?.toLowerCase()] || roleThemes.collaborator;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-50/30 min-h-screen space-y-6">
      <div className="w-full border border-zinc-200 rounded-3xl bg-white shadow-sm overflow-hidden group">
        {/* Banner Cover Image Area */}
        <div className="w-full h-48 bg-zinc-900 relative overflow-hidden">
          {user.image ? (
            <Image
              width={800}
              height={400}
              src={user.image}
              alt="Profile Wallpaper Cover"
              className="w-full h-full object-cover opacity-80"
              priority
            />
          ) : (
            <div className="w-full h-full bg-zinc-800" />
          )}
        </div>

        {/* User Info Row */}
        <div className="p-6 relative pt-0 flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-16 border-b border-zinc-100 pb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-md shrink-0 relative z-10">
            {user.image && (
              <Image
                width={150}
                height={150}
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left z-10 pt-10 sm:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-4">
              <h2 className="text-2xl font-bold text-zinc-900 capitalize">
                {user.name}
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border self-center ${activeRole.styles}`}
              >
                {activeRole.icon} {activeRole.label}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 text-xs font-medium text-zinc-500 pt-1">
              <span className="flex items-center gap-1.5">
                <FiMail size={14} /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} /> Member since {signupDate}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Client Form Component - Passing data containing fresh skills/bio */}
        <div className="p-6 bg-white">
          <ProfileEditForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default CollaboratorProfile;
