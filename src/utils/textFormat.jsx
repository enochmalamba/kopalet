const URL_REGEX = /https?:\/\/[^\s]+/g;
const EMAIL_REGEX = /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;
const PHONE_REGEX = /(\+?[\d\s\-().]{7,})/g;

const linkify = (line) => {
  const urlParts = line.split(URL_REGEX);
  const urlMatches = line.match(URL_REGEX) || [];

  const result = [];
  urlParts.forEach((part, i) => {
    // Split by emails first
    const emailParts = part.split(EMAIL_REGEX);
    const emailMatches = part.match(EMAIL_REGEX) || [];

    emailParts.forEach((emailChunk, ei) => {
      if (emailMatches.includes(emailChunk)) {
        result.push(
          <a
            key={`e-${i}-${ei}`}
            href={`mailto:${emailChunk}`}
            className="external_link"
          >
            {emailChunk}
          </a>,
        );
      } else {
        // Handle phones within non-email parts
        const phoneParts = emailChunk.split(PHONE_REGEX);
        phoneParts.forEach((chunk, j) => {
          if (PHONE_REGEX.test(chunk)) {
            result.push(
              <a
                key={`p-${i}-${ei}-${j}`}
                href={`tel:${chunk.replace(/\s/g, "")}`}
                className="external_link"
              >
                {chunk}
              </a>,
            );
          } else {
            result.push(chunk);
          }
          PHONE_REGEX.lastIndex = 0;
        });
      }
    });

    if (urlMatches[i]) {
      result.push(
        <a
          key={`u-${i}`}
          href={urlMatches[i]}
          target="_blank"
          rel="noreferrer"
          className="external_link"
        >
          {urlMatches[i]}
        </a>,
      );
    }
  });

  return result;
};

export const preserveLineBreaks = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {linkify(line)}
      <br />
    </span>
  ));
};
