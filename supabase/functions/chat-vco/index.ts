import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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
    if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');

    const { message, history } = await req.json();

    if (!message) throw new Error('message is required');

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: 'user', content: message });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

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
