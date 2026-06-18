// script.js
const SUPABASE_URL = "https://dholuysmddxtihrlivmt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRob2x1eXNtZGR4dGlocmxpdm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODI4NzksImV4cCI6MjA5Njc1ODg3OX0.1kzz1XQZ3jaaJSEY4JB_sg-mdlnyPn3d26JI1rNfuRIeyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRob2x1eXNtZGR4dGlocmxpdm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODI4NzksImV4cCI6MjA5Njc1ODg3OX0.1kzz1XQZ3jaaJSEY4JB_sg-mdlnyPn3d26JI1rNfuRI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateVisitorCount() {
    try {
        // Ambil data visitor saat ini
        const { data, error: fetchError } = await supabase
            .from("visitors")
            .select("total_visits")
            .eq("id", 1)
            .single();

        if (fetchError) {
            console.error("Gagal mengambil data visitor:", fetchError);
            return;
        }

        const currentCount = data?.total_visits || 0;
        const newCount = currentCount + 1;

        // Update visitor count
        const { error: updateError } = await supabase
            .from("visitors")
            .update({ total_visits: newCount })
            .eq("id", 1);

        if (updateError) {
            console.error("Gagal update visitor count:", updateError);
            return;
        }

        // Tampilkan di halaman
        const countElement = document.getElementById("visitor-count");
        if (countElement) {
            countElement.innerText = newCount;
        }

    } catch (err) {
        console.error("Error unexpected:", err);
    }
}

// Jalankan setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", updateVisitorCount);