---
layout: page
title: Contact
subtitle: Get in touch with the Security2Cure team for tickets, sponsorship, media, or general enquiries. *
permalink: /contact/
---

<div class="grid grid--2">
  <div>
    <h2>Contact Us</h2>
    <p>
      Have a question about tickets, sponsorship, speaking opportunities, or our charitable work?
      We would love to hear from you.
    </p>
    <div class="contact-info">
      <div class="contact-info__item">
        <div>
          <div class="contact-info__label">General Enquiries</div>
          <div class="contact-info__value">
            <a href="mailto:{{ site.organization.contact_email }}">{{ site.organization.contact_email }}</a>
          </div>
        </div>
      </div>
      <div class="contact-info__item">
        <div>
          <div class="contact-info__label">Sponsorship</div>
          <div class="contact-info__value">
            <a href="mailto:{{ site.organization.contact_email }}">{{ site.organization.contact_email }}</a>
          </div>
        </div>
      </div>
      <div class="contact-info__item">
        <div>
          <div class="contact-info__label">Media</div>
          <div class="contact-info__value">
            <a href="mailto:{{ site.organization.contact_email }}">{{ site.organization.contact_email }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h2>{{ site.conference.year }} Venue</h2>
    <p>
      <strong>{{ site.conference.venue }}</strong><br>
      {{ site.conference.venue_address }}
    </p>
    <p>
      <strong>Date:</strong> {{ site.conference.date_display }}<br>
      <strong>City:</strong> {{ site.conference.city }}
    </p>
    {% include venue-map.html %}
    <p class="contact-venue__note">
      Fully accessible venue. Contact us for specific access or parking needs.
    </p>
  </div>
</div>

<h2>Connect With Us</h2>
<p>Follow Security2Cure on social media for conference updates, speaker announcements, and community news.</p>
<div class="contact-social">
  {% include organization-social.html %}
</div>
