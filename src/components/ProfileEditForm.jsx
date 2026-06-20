"use client";

import React, { useState } from "react";
import { FiEdit2, FiX, FiCheck, FiCpu, FiFileText } from "react-icons/fi";
import { Button, Input, TextArea, Textarea } from "@heroui/react";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/lib/actions/profile";

export default function ProfileEditForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("email", user.email);

    try {
      const success = await updateUserProfile(formData);
      if (success) {
        toast.success("Profile records updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to apply profile changes.");
      }
    } catch (err) {
      toast.error("An error occurred during preservation routines.");
    } finally {
      setLoading(false);
    }
  };

  //   console.log(user);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-zinc-900">
          Detailed Bio Metadata
        </h3>
        <Button
          size="sm"
          variant="flat"
          onPress={() => setIsEditing(!isEditing)}
          startContent={isEditing ? <FiX size={14} /> : <FiEdit2 size={14} />}
          className="font-semibold rounded-xl"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Static Presentation Mode Layout */}
          <div className="md:col-span-2 space-y-4 bg-white border border-zinc-200 p-5 rounded-2xl shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <FiFileText /> Personal Biography Summary
              </span>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {user.bio || "No professional biography has been drafted yet."}
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-white border border-zinc-200 p-5 rounded-2xl shadow-xs">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <FiCpu /> Core Skill Indexes
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 text-xs font-semibold rounded-lg border border-zinc-200/40"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-400 italic">
                    No skills registered.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Update Form Engine Mode */
        <form
          onSubmit={handleFormSubmit}
          className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-6"
        >
          {/* First Row: Name & Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Full Name Display
              </label>
              <Input
                name="name"
                isRequired
                defaultValue={user.name}
                placeholder="Your Name"
                variant="bordered"
                radius="xl"
                className="font-medium"
                classNames={{
                  inputWrapper:
                    "border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-950 h-11",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Avatar Thumbnail Image URL
              </label>
              <Input
                name="image"
                defaultValue={user.image}
                placeholder="https://i.ibb.co/..."
                variant="bordered"
                radius="xl"
                className="font-medium"
                classNames={{
                  inputWrapper:
                    "border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-950 h-11",
                }}
              />
            </div>
          </div>

          {/* Second Row: Skills */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Professional Skillsets (Split fields with a comma)
            </label>
            <Input
              name="skills"
              defaultValue={user.skills ? user.skills.join(", ") : ""}
              placeholder="React, Next.js, Node.js, MongoDB"
              variant="bordered"
              radius="xl"
              className="font-medium"
              classNames={{
                inputWrapper:
                  "border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-950 h-11",
              }}
            />
          </div>

          {/* Third Row: Biography (Fixed uppercase naming rule) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Brief Professional Biography Pitch
            </label>
            <TextArea
              name="bio"
              defaultValue={user.bio}
              placeholder="Introduce your engineering background, project preferences, or current tech stacks..."
              variant="bordered"
              radius="xl"
              minRows={4}
              className="font-medium w-full"
              classNames={{
                inputWrapper:
                  "border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-950 p-3",
              }}
            />
          </div>

          {/* Action Control Button */}
          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100">
            <Button
              size="md"
              type="submit"
              isLoading={loading}
              className="bg-zinc-950 text-white font-semibold rounded-xl px-6"
            >
              Save Parameters
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
