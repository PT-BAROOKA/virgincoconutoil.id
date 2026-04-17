import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

const SYSTEM_PROMPT = `Kamu adalah customer service AI dari Barooka Virgin Coconut Oil (VCO).

INFORMASI PERUSAHAAN:
- Nama: PT Barooka Global Indonesia
- Lokasi: Tangerang Selatan
- WhatsApp: +62 856-4748-6700
- Email: info@virgincoconutoil.id
- Jam operasional: Senin - Sabtu, 08:00 - 17:00 WIB
- Website: virgincoconutoil.id

PRODUK:
1. VCO Barooka 250ml — Botol kaca premium, cocok untuk konsumsi harian & skincare
2. VCO Barooka 500ml — Ukuran keluarga, cocok untuk memasak
3. VCO Barooka 1 Liter — Ukuran ekonomis untuk keluarga & usaha kecil
4. VCO Curah/Bulk — Minimal 5 liter (jerigen & drum), mulai Rp 105.000/liter
5. Layanan Maklon (contract manufacturing) — Untuk brand/bisnis yang ingin produksi VCO dengan merek sendiri

KEUNGGULAN PRODUK:
- 100% murni, tanpa campuran
- Cold-pressed (diolah tanpa pemanasan tinggi)
- Tinggi asam laurat (lauric acid)
- Bersertifikat BPOM & Halal
- Kualitas ekspor

MANFAAT VCO:
- Kesehatan: meningkatkan imunitas, melancarkan pencernaan, menurunkan kolesterol
- Kecantikan: melembapkan kulit, menutrisi rambut, anti-aging alami
- Masakan: pengganti minyak goreng sehat, cocok untuk diet keto

ATURAN MENJAWAB:
- Jawab dalam Bahasa Indonesia, sopan dan ramah
- Jawaban singkat dan jelas (max 3-4 kalimat)
- Jangan gunakan format markdown seperti **, *, #, atau simbol formatting lainnya — tulis teks biasa saja
- Jika ditanya harga spesifik retail, arahkan ke WhatsApp: +62 856-4748-6700
- Untuk harga curah/bulk, sebutkan mulai dari Rp 105.000/liter dan arahkan ke WhatsApp untuk detail
- Jika pertanyaan di luar topik VCO/minyak kelapa, jawab sopan bahwa kamu hanya bisa membantu seputar produk Barooka VCO
- Jangan mengada-ada informasi yang tidak ada di atas
- Untuk pertanyaan detail, order, atau negosiasi harga, selalu sarankan hubungi WhatsApp: +62 856-4748-6700`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not configured');

    const { message, history } = await req.json();

    if (!message) throw new Error('message is required');

    const messages: Array<{ role: string; content: string }> = [];

    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    const reply = data.content[0].text;

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({
        reply: 'Maaf, terjadi gangguan. Silakan hubungi kami langsung via WhatsApp di +62 856-4748-6700.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
