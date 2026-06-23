---
layout: page
title: Donate
subtitle: Support cancer awareness and help security2cure continue its charitable work.
permalink: /donations/
---

<div class="donation-cta" style="margin-bottom: 3rem;">
  <div class="donation-cta__icon" aria-hidden="true">🎗️</div>
  <h2 class="donation-cta__title">Make a Tax-Deductible Donation</h2>
  <p class="donation-cta__text">
    {{ site.donations.text }}
  </p>
  <a
    href="{{ site.donations.url }}"
    class="btn btn--warm"
    {% if site.donations.url contains 'http' %}target="_blank" rel="noopener noreferrer"{% endif %}
  >{{ site.donations.button_label }}</a>
</div>

<h2>Why Donate?</h2>
<p>
  security2cure is more than a conference. It is a registered charity committed to raising awareness
  about serious health issues such as cancer. Your contribution helps us:
</p>
<ul>
  <li>Fund cancer awareness and prevention education programmes</li>
  <li>Keep ticket prices accessible for the cyber security community</li>
  <li>Support speakers and attendees affected by cancer</li>
  <li>Expand security2cure events to reach more communities across Australia</li>
</ul>

<h2>Other Ways to Support</h2>
<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title">Attend the Conference</h3>
    <p class="card__text">
      Purchase a ticket to security2cure {{ site.conference.year }}. A portion of every ticket
      supports our charitable mission.
    </p>
    <a href="{{ site.conference.tickets_url }}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">Buy Tickets</a>
  </div>
  <div class="card">
    <h3 class="card__title">Become a Sponsor</h3>
    <p class="card__text">
      Partner with security2cure and align your brand with a cause the cyber community cares deeply about.
    </p>
    <a href="{{ '/contact/' | relative_url }}" class="btn btn--secondary btn--sm">Sponsor Enquiries</a>
  </div>
  <div class="card">
    <h3 class="card__title">Spread the Word</h3>
    <p class="card__text">
      Share security2cure with your network. Follow us on social media and help us reach more people.
    </p>
    <a href="{{ site.organization.linkedin }}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">Follow on LinkedIn</a>
  </div>
</div>

<h2>Charity Details</h2>
<p>
  <strong>{{ site.organization.legal_name }}</strong><br>
  ABN: {{ site.organization.abn }}<br>
  Status: <a href="{{ site.organization.acnc_url }}" target="_blank" rel="noopener noreferrer">{{ site.organization.charity }}</a><br>
  Email: <a href="mailto:{{ site.organization.contact_email }}">{{ site.organization.contact_email }}</a>
</p>
<p>
  <a href="{{ site.organization.acnc_url }}" target="_blank" rel="noopener noreferrer">View our ACNC charity profile</a>
</p>
