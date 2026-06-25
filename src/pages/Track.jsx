import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Track() {
  const [params] = useSearchParams();

  useEffect(() => {
    const update = async () => {
      const id = params.get("id");

      if (id) {
        await supabase
          .from("leads")
          .update({ link_clicked: true })
          .eq("id", id);
      }

      window.location.href = "https://admexo.com";
    };

    update();
  }, []);

  return <h2>Redirecting...</h2>;
}