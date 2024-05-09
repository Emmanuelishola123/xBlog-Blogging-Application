const { htmlToText  } = ('');
// There is also an alias to `convert` called `htmlToText`.

const options = {
  wordwrap: 130,
  // ...
};

export const html2Text = (html = '<div>Hello World</div>') => {
    const text = htmlToText(html, options);
    console.log(text); // Hello World
    return text
}