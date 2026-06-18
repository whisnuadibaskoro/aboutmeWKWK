const SUPABASE_URL =
"URL_ANDA";

const SUPABASE_KEY =
"ANON_KEY_ANDA";

const supabase =
window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function updateVisitor() {

  const { data } =
  await supabase
    .from("visitors")
    .select("*")
    .eq("id", 1)
    .single();

  const total =
  data.total_visits + 1;

  await supabase
    .from("visitors")
    .update({
      total_visits: total
    })
    .eq("id", 1);

  document.getElementById(
    "visitor-count"
  ).innerText = total;

}

updateVisitor();