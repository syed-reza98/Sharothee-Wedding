1. [Violation] Forced reflow while executing JavaScript took 83ms
2. [Violation] Added non-passive event listener to a scroll-blocking <some> event. Consider marking event handler as 'passive' to make the page more responsive. See <URL>

3. [Violation] Added non-passive event listener to a scroll-blocking 'touchmove' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952

4. main.js:420 [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952

5. The service worker navigation preload request was cancelled before 'preloadResponse' settled. If you intend to use 'preloadResponse', use waitUntil() or respondWith() to wait for the promise to settle.

6. Users may have difficulties reading text content due to insufficient color contrast
Low-contrast text is difficult or impossible for users to read. A minimum contrast ratio (AA) of 4.5 is recommended for all text. Since font size and weight affect color perception, an exception is made for very large or bold text — in this case, a contrast ratio of 3.0 is allowed. The enhanced conformance level (AAA) requires the contrast ratio to be above 7.0 for regular text and 4.5 for large text.

Update colors or change the font size or weight to achieve sufficient contrast. You can use the “Suggest color” feature in the DevTools color picker to automatically select a better text color.

20 elements
Element	Contrast ratio	Minimum AA ratio	Minimum AAA ratio	Text size	Text weight
a.bg-primary.hover:bg-primary-dark.text-white.px-4.py-2.rounded-full.text-sm.font-medium.transition-colors	2.22	4.5	7	14px	500
p.text-sm.text-muted.mb-4	3.4	4.5	7	14px	400
div.text-[10px].sm:text-xs.text-muted.font-medium.tracking-wide	3.4	4.5	7	10px	500
div.text-[10px].sm:text-xs.text-muted.font-medium.tracking-wide	3.4	4.5	7	10px	500
div.text-[10px].sm:text-xs.text-muted.font-medium.tracking-wide	3.4	4.5	7	10px	500
div.text-[10px].sm:text-xs.text-muted.font-medium.tracking-wide	3.4	4.5	7	10px	500
p.text-muted.font-medium	3.4	4.5	7	16px	500
p.text-sm.text-muted.mt-1	3.4	4.5	7	14px	400
a.w-full.sm:w-auto.bg-primary.hover:bg-primary-dark.text-white.px-6.sm:px-8.py-3.rounded-full.font-medium.transition-all.duration-300.shadow-lg.hover:shadow-xl	1.95	4.5	7	16px	500
span.mx-3.text-xs.font-medium.text-primary.tracking-wider.uppercase	2.22	4.5	7	12px	500
span	2.22	4.5	7	14px	500
span.mx-3.text-xs.font-medium.text-primary.tracking-wider.uppercase	2.22	4.5	7	12px	500
span.w-20.text-primary.font-medium	2.22	4.5	7	14px	500
span.w-20.text-primary.font-medium	2.22	4.5	7	14px	500
span.w-20.text-primary.font-medium	2.22	4.5	7	14px	500
span	2.22	4.5	7	14px	500
span.mx-3.text-xs.font-medium.text-primary.tracking-wider.uppercase	2.22	4.5	7	12px	500
span	2.22	4.5	7	14px	500
span.mx-3.text-xs.font-medium.text-primary.tracking-wider.uppercase	2.22	4.5	7	12px	500
span



7. No label associated with a form field
A <label> isn't associated with a form field.

To fix this issue, nest the <input> in the <label> or provide a for attribute on the <label> that matches a form field id.

28 resources

8. An element doesn't have an autocomplete attribute
A form field has an id or name attribute that the browser's autofill recognizes. However, it doesn't have an autocomplete attribute assigned. This might prevent the browser from correctly autofilling the form.

To fix this issue, provide an autocomplete attribute.

12 resources

9. A form field element should have an id or name attribute
A form field element has neither an id nor a name attribute. This might prevent the browser from correctly autofilling the form.

To fix this issue, add a unique id or name attribute to a form field. This is not strictly needed, but still recommended even if you have an autocomplete attribute on the same element.

32 resources