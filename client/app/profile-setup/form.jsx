"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function ProfileSetupPage() {
  const [username, setUsername] = useState("");
    const [usernameTaken, setUsernameTaken] = useState(false);
      const [avatar, setAvatar] = useState("");
        const [bio, setBio] = useState("");
          const [role, setRole] = useState("");
            const [region, setRegion] = useState("");
              const [submitting, setSubmitting] = useState(false);

// Gaming Philosophy & Personality
const [motivation, setMotivation] = useState("");
const [playStyle, setPlayStyle] = useState("");
const [storyPreference, setStoryPreference] = useState("");
const [sandboxPreference, setSandboxPreference] = useState("");
const [movieTitle, setMovieTitle] = useState("");
const [favoriteCharacter, setFavoriteCharacter] = useState("");
const [superpower, setSuperpower] = useState("");
const [memorableMoment, setMemorableMoment] = useState("");
const [fictionalWorld, setFictionalWorld] = useState("");
const [emojiCommunication, setEmojiCommunication] = useState("");
const [pumpUpMusic, setPumpUpMusic] = useState("");
const [weirdestThing, setWeirdestThing] = useState("");
const [addictiveGame, setAddictiveGame] = useState("");

const avatarList = [
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar1.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar2.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar3.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar4.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar5.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar6.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar7.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar8.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar9.png",
   "https://raw.githubusercontent.com/yourusername/repo/main/avatar10.png",
              ];

// Check username uniqueness
useEffect(() => {
const checkUsername = async () => {
if (!username) return setUsernameTaken(false);
const { data } = await supabase
 .from("profiles")
  .select("id")
   .eq("username", username)
    .single();
    setUsernameTaken(!!data);
     };
     const timeout = setTimeout(checkUsername, 500);
     return () => clearTimeout(timeout);
       }, [username]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!username || usernameTaken) return;
  setSubmitting(true);
  const user = supabase.auth.user();
  const { error } = await supabase.from("profiles").upsert({
  id: user.id,
  username,
  avatar_url: avatar,
  bio,
  role,
  region,
  motivation,
  play_style: playStyle,
  story_preference: storyPreference,
  sandbox_preference: sandboxPreference,
  movie_title: movieTitle,
  favorite_character: favoriteCharacter,
  superpower,
  memorable_moment: memorableMoment,
  fictional_world: fictionalWorld,
  emoji_communication: emojiCommunication,
  pump_up_music: pumpUpMusic,
  weirdest_thing: weirdestThing,
  addictive_game: addictiveGame,
  created_at: new Date(),
   });
   setSubmitting(false);
   if (error) alert(error.message);
   else alert("Profile saved! Redirecting...");
     };
return (
  <main className="relative min-h-screen w-full bg-black flex items-center justify-center">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.08)_0%,transparent_70%)] animate-holoWave"></div>
  <motion.div
  initial={{ opacity: 0, scale: 0.96, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative z-10 w-[92%] max-w-xl bg-black/50 border border-blue-400/30 rounded-3xl backdrop-blur-lg p-10 shadow-[0_0_40px_rgba(0,200,255,0.35)] overflow-y-auto max-h-[90vh]"
        >
<h1 className="text-center text-3xl font-extrabold text-white tracking-wide mb-6">
  Complete Your Profile
  </h1>
  <form onSubmit={handleSubmit} className="space-y-6">
  {/* /username section */}
  <div>
  <label className="block font-bold text-white mb-2">Username</label>
  <input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className={`w-full px-4 py-3 rounded-xl ${
  usernameTaken ? "border-2 border-red-500" : "border border-white/20"
    } bg-white/10 text-white focus:outline-none`}
    placeholder="Choose a username"
      />
      {usernameTaken && <p className="text-red-500 mt-1 animate-pulse">Username already taken!</p>}
       </div>
{/* /avatar section */}
<div>
<label className="block font-bold text-white mb-2">Select Avatar</label>
<div className="flex flex-wrap gap-3">
{avatarList.map((img) => (
<img
key={img}
src={img}
alt="avatar"
className={`w-16 h-16 rounded-full cursor-pointer border-4 ${
avatar === img ? "border-blue-400" : "border-transparent"
   }`}
   onClick={() => setAvatar(img)}
     />
       ))}
       </div>
       </div>
{/* /bio section */}
<div>
<label className="block font-bold text-white mb-2">Bio</label>
<textarea
value={bio}
onChange={(e) => setBio(e.target.value)}
placeholder="Tell us about yourself"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none"
  />
  </div>
  {/* /role section */}
  <div>
  <label className="block font-bold text-white mb-2">Role / In-Game Position</label>
  <input
  type="text"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  placeholder="e.g., Tank, DPS, Support"
  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none"
   />
   </div>

{/* /region section */}
<div>
<label className="block font-bold text-white mb-2">Region / Server</label>
<input
type="text"
value={region}
onChange={(e) => setRegion(e.target.value)}
placeholder="e.g., NA, EU, Asia"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none"
    />
    </div>

{/* /Gaming Philosophy & Preferences */}
<div>
<h2 className="font-bold text-lg text-white mb-2">Gaming Philosophy & Preferences</h2>
<label className="block text-white mb-1">What motivates you to play video games?</label>
<select
value={motivation}
onChange={(e) => setMotivation(e.target.value)}
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 >
 <option value="">Select motivation</option>
 <option value="Competition">Competition</option>
 <option value="Story">Story immersion</option>
 <option value="Socializing">Socializing</option>
 <option value="Achievement">Achieving goals</option>
 </select>

<label className="block text-white mb-1">Cooperative or competitive?</label>
<select
value={playStyle}
onChange={(e) => setPlayStyle(e.target.value)}
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 >
 <option value="">Select play style</option>
 <option value="Cooperative">Cooperative</option>
 <option value="Competitive">Competitive</option>
 </select>

<label className="block text-white mb-1">Story preference</label>
<select
value={storyPreference}
onChange={(e) => setStoryPreference(e.target.value)}
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
  >
  <option value="">Select story type</option>
  <option value="Linear">Strong, linear storyline</option>
  <option value="Sandbox">Open sandbox adventure</option>
  </select>
  </div>

 {/* /Personality & Character */}
 <div>
 <h2 className="font-bold text-lg text-white mb-2">Personality & Character</h2>
 <input
 type="text"
 value={movieTitle}
 onChange={(e) => setMovieTitle(e.target.value)}
 placeholder="If your gaming life was a movie, title it"
 className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
  />
<input
type="text"
value={favoriteCharacter}
onChange={(e) => setFavoriteCharacter(e.target.value)}
placeholder="Favorite game character & why"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 />
<input
type="text"
value={superpower}
onChange={(e) => setSuperpower(e.target.value)}
placeholder="If you had a superpower, what would it be?"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 />
<textarea
value={memorableMoment}
onChange={(e) => setMemorableMoment(e.target.value)}
placeholder="Memorable gaming moment"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 />
 <input
 type="text"
 value={fictionalWorld}
 onChange={(e) => setFictionalWorld(e.target.value)}
 placeholder="Fictional world you want to live in"
 className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 />
 </div>
{/* /Fun & Quirky */}
<div>
<h2 className="font-bold text-lg text-white mb-2">Fun & Quirky</h2>
<input
type="text"
value={emojiCommunication}
onChange={(e) => setEmojiCommunication(e.target.value)}
placeholder="Emoji or game quotes for communication"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
  />
<input
type="text"
value={pumpUpMusic}
onChange={(e) => setPumpUpMusic(e.target.value)}
placeholder="Pump-up song or theme music"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
  />
  <input
  type="text"
  value={weirdestThing}
  onChange={(e) => setWeirdestThing(e.target.value)}
  placeholder="Weirdest thing done in-game or real life"
  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
   />
<input
type="text"
value={addictiveGame}
onChange={(e) => setAddictiveGame(e.target.value)}placeholder="Most addictive game ever played"
className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none mb-3"
 />
  </div>
<button
type="submit"
disabled={submitting || usernameTaken}
className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg transition-all disabled:opacity-50"
  >
  {submitting ? "Saving..." : "Save Profile"}
  </button>
  </form>
  </motion.div>
  </main>
    );
    }