---
layout: page
title: Conference Schedule
subtitle: Security2Cure 2026, Friday 9 October 2026 · Suncorp Group offices, Level 27, 80 Ann Street, Brisbane
permalink: /schedule/
---

{% if site.conference.registration_open %}
<div class="tickets-banner" id="tickets">
  <p class="tickets-banner__text">
    <strong>Registration is open.</strong> Secure your place at Security2Cure {{ site.conference.year }}. Places are limited.
  </p>
  <a href="{{ site.conference.tickets_url }}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer">Get Tickets</a>
</div>
{% endif %}

{% include schedule.html %}

<p style="margin-top: 2.5rem; color: var(--color-text-muted, #94a3b8); font-size: 0.9375rem;">
  <em>Schedule subject to change. All times are AEST. Check back closer to the event for final speaker confirmations.</em>
</p>
