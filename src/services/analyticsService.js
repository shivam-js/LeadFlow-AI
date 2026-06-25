import { supabase } from "./supabase";

export async function getAllLeads() {
  return await supabase.from("leads").select("*");
}