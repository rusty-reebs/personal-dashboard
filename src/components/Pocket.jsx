import { useEffect, useState } from "react";
import { ActionIcon, Loader } from "@mantine/core";
import { FiArchive, FiExternalLink } from "react-icons/fi";
import { FaGetPocket } from "react-icons/fa";
import { BsStar, BsStarFill, BsTrash2 } from "react-icons/bs";

export default function Pocket() {
  const [reads, setReads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [view, setView] = useState("all");

  useEffect(() => {
    // const getPocket = async () => {
    //   try {
    //     const result = await fetch(
    //       `${
    //         import.meta.env.DEV
    //           ? "http://localhost:9999/.netlify/functions/getPocket"
    //           : "/.netlify/functions/getPocket"
    //       }`
    //     );
    //     setIsLoading(false);
    //     // const arr = Object.values(result.list);
    //     // console.log(arr);
    //     setReads(result);
    //   } catch (err) {
    //     setIsError(err);
    //     console.log(err);
    //   }
    // };
    // getPocket();
    // const parsed = JSON.parse(dummyData);
    // setReads(parsed);
    const pocketObjects = Object.values(dummyData.list);
    // console.log(pocketObjects);
    setReads(pocketObjects);
    setIsLoading(false);
  }, []);

  return (
    <div className="col-start-3 row-span-2 flex flex-col gap-4 py-8 px-6 rounded-lg bg-four border-[0.5px] border-three text-five">
      <div className="flex flex-row justify-between">
        <p className="text-lg inline-flex gap-1">
          <ActionIcon variant="filled">
            <FaGetPocket className="text-red-500 self-center" size={20} />
          </ActionIcon>
          Saved Reads
        </p>
        <select
          placeholder="Select"
          className="bg-four p-1 text-xs border border-three rounded-md"
          value={view}
          onChange={(e) => setView(e.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
          <option value="archive">Archive</option>
        </select>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {isError ? (
          <div className="mx-auto my-auto">⚠️ {JSON.stringify(isError)}</div>
        ) : isLoading ? (
          <Loader variant="dots" color="#AF0404" className="mx-auto my-auto" />
        ) : (
          <div className="flex flex-col">
            {reads?.map((each) => (
              <div
                key={each.item_id}
                className="group flex flex-row justify-between text-sm py-2 px-3 hover:py-[0.427rem] hover:border hover:border-three hover:rounded-md hover:bg-one"
              >
                <div className="flex flex-col basis-3/4">
                  <div className="">{each.resolved_title}</div>
                  <div className="italic text-xs whitespace-nowrap">
                    {each.time_to_read ? `${each?.time_to_read} MIN` : ""}
                  </div>
                </div>
                <div className="hidden group-hover:flex flex-row gap-2">
                  {each.favorite == "1" ? (
                    <BsStarFill size={15} className="text-yellow-300" />
                  ) : (
                    <BsStar size={15} />
                  )}
                  <FiArchive size={15} />
                  <BsTrash2 size={15} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const dummyData = {
  status: 1,
  complete: 1,
  list: {
    2595349660: {
      item_id: "2595349660",
      resolved_id: "2595349660",
      given_url:
        "http://getpocket.com/explore/item/the-science-behind-miracles",
      given_title: "The Science Behind Miracles",
      favorite: "0",
      status: "0",
      time_added: "1676466953",
      time_updated: "1676466953",
      time_read: "0",
      time_favorited: "0",
      sort_id: 11,
      resolved_title: "The Science Behind Miracles",
      resolved_url:
        "https://getpocket.com/explore/item/the-science-behind-miracles",
      excerpt:
        "How our minds push our bodies to defy expectations, beliefs, and even our own biology—in short, to make miracles.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1597",
      lang: "en",
      time_to_read: 7,
      top_image_url:
        "https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F369%2F1633125848_ScreenShot2021-10-01at3.02.37PM.png",
      domain_metadata: {
        name: "Pocket",
        logo: "https://logo.clearbit.com/getpocket.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/getpocket.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 618,
    },
    3242033017: {
      item_id: "3242033017",
      resolved_id: "3242033017",
      given_url: "https://getpocket.com/explore/item/welcome-to-pocket",
      given_title: "",
      favorite: "0",
      status: "0",
      time_added: "1669933538",
      time_updated: "1669933538",
      time_read: "0",
      time_favorited: "0",
      sort_id: 31,
      resolved_title: "How to Get the Most Out of Pocket",
      resolved_url: "https://getpocket.com/explore/item/welcome-to-pocket",
      excerpt:
        "We’re excited to introduce you to some of our most-loved and most-popular features.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "554",
      lang: "en",
      time_to_read: 3,
      top_image_url:
        "https://pocket-image-cache.com/1200x/filters:format(jpg):extract_focal()/https%3A%2F%2Fpocket-syndicated-images.s3.amazonaws.com%2Farticles%2F6007%2F1611858023_1hKCxwuSJWmmAGa4bVi_V7Q.png",
      domain_metadata: {
        name: "Pocket",
        logo: "https://logo.clearbit.com/getpocket.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/getpocket.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 214,
    },
    3263889765: {
      item_id: "3263889765",
      resolved_id: "3263889765",
      given_url: "https://overreacted.io/before-you-memo/",
      given_title: "Before You memo() — Overreacted",
      favorite: "0",
      status: "0",
      time_added: "1670453377",
      time_updated: "1670453384",
      time_read: "0",
      time_favorited: "0",
      sort_id: 27,
      resolved_title: "Before You memo()",
      resolved_url: "https://overreacted.io/before-you-memo/",
      excerpt:
        "There are many articles written about React performance optimizations. In general, if some state update is slow, you need to: This last step is annoying, especially for components in between, and ideally a compiler would do it for you. In the future, it might.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "861",
      lang: "en",
      time_to_read: 4,
      listen_duration_estimate: 333,
    },
    3483666613: {
      item_id: "3483666613",
      resolved_id: "3483666613",
      given_url: "https://www.taniarascia.com/introduction-to-graphql/",
      given_title: "An Introduction to GraphQL | Tania Rascia",
      favorite: "0",
      status: "0",
      time_added: "1676637717",
      time_updated: "1676637717",
      time_read: "0",
      time_favorited: "0",
      sort_id: 6,
      resolved_title: "An Introduction to GraphQL",
      resolved_url: "https://www.taniarascia.com/introduction-to-graphql/",
      excerpt:
        "As web and mobile applications become more mature and complex, software engineers invent clever new ways of improving the interaction between client and server within an application.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "1862",
      lang: "en",
      time_to_read: 8,
      top_image_url: "https://www.taniarascia.com/logo.png",
      listen_duration_estimate: 721,
    },
    3505759020: {
      item_id: "3505759020",
      resolved_id: "3505759020",
      given_url: "https://blog.superhuman.com/personal-life-dashboard/",
      given_title: "How to create a personal life dashboard",
      favorite: "0",
      status: "0",
      time_added: "1670340561",
      time_updated: "1670340561",
      time_read: "0",
      time_favorited: "0",
      sort_id: 28,
      resolved_title: "How to create a personal life dashboard",
      resolved_url: "https://blog.superhuman.com/personal-life-dashboard/",
      excerpt:
        "Imagine trying to do your job without data or KPIs. How would you measure progress and success? How would you know when something isn't working, and it's time to try a new approach? At work, many of our decisions are informed by data.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "2643",
      lang: "en",
      time_to_read: 12,
      top_image_url:
        "https://blog.superhuman.com/content/images/2021/12/00_Hero-v1-2.jpg",
      listen_duration_estimate: 1023,
    },
    3524774508: {
      item_id: "3524774508",
      resolved_id: "3524774508",
      given_url:
        "https://www.developerway.com/posts/how-to-write-performant-react-code",
      given_title:
        "How to write performant React code: rules, patterns, do's and don'ts",
      favorite: "0",
      status: "0",
      time_added: "1669933775",
      time_updated: "1670453435",
      time_read: "0",
      time_favorited: "0",
      sort_id: 30,
      resolved_title:
        "How to write performant React code: rules, patterns, do's and don'ts",
      resolved_url:
        "https://www.developerway.com/posts/how-to-write-performant-react-code",
      excerpt:
        "Performance and React! Such a fun topic with so many controversial opinions and so many best practices flipping to be the opposite in just 6 months. Is it even possible to say anything definitive here or to make any generalized recommendations?",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "2951",
      lang: "en",
      time_to_read: 13,
      top_image_url:
        "https://www.developerway.com/assets/how-to-write-performant-react-code/welcome.jpg",
      listen_duration_estimate: 1142,
    },
    3673532989: {
      item_id: "3673532989",
      resolved_id: "3673532989",
      given_url: "https://www.developerway.com/posts/react-re-renders-guide",
      given_title: "React re-renders guide: everything, all at once",
      favorite: "0",
      status: "0",
      time_added: "1670032703",
      time_updated: "1670453421",
      time_read: "0",
      time_favorited: "0",
      sort_id: 29,
      resolved_title: "React re-renders guide: everything, all at once",
      resolved_url: "https://www.developerway.com/posts/react-re-renders-guide",
      excerpt:
        "Comprehensive guide on React re-renders. The guide explains what are re-renders, what is necessary and unnecessary re-render, what can trigger a React component re-render.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "62",
      lang: "en",
      top_image_url:
        "https://www.developerway.com/assets/react-re-renders-guide/welcome.png",
      listen_duration_estimate: 24,
    },
    3676551853: {
      item_id: "3676551853",
      resolved_id: "3676551853",
      given_url:
        "https://www.theodinproject.com/lessons/javascript-a-very-brief-intro-to-cs",
      given_title: "A Very Brief Intro to CS | The Odin Project",
      favorite: "0",
      status: "0",
      time_added: "1675646837",
      time_updated: "1675646926",
      time_read: "0",
      time_favorited: "0",
      sort_id: 25,
      resolved_title: "A Very Brief Intro to CS",
      resolved_url:
        "https://www.theodinproject.com/lessons/javascript-a-very-brief-intro-to-cs",
      excerpt:
        "You’ve learned how to build some cool stuff already and, frankly, you could probably make some decent websites without a crazy amount of additional formal education.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "341",
      lang: "en",
      top_image_url:
        "https://www.theodinproject.com/assets/og-logo-022832d4cefeec1d5266237be260192f5980f9bcbf1c9ca151b358f0ce1fd2df.png",
      listen_duration_estimate: 132,
    },
    3692458027: {
      item_id: "3692458027",
      resolved_id: "3692458027",
      given_url:
        "https://mikebifulco.com/posts/remote-work-and-the-third-place",
      given_title:
        "The third place - the secret to a happy life for remote workers",
      favorite: "1",
      status: "0",
      time_added: "1676637492",
      time_updated: "1676812408",
      time_read: "0",
      time_favorited: "1676727570",
      sort_id: 8,
      resolved_title:
        "The third place - the secret to a happy life for remote workers",
      resolved_url:
        "https://mikebifulco.com/posts/remote-work-and-the-third-place",
      excerpt:
        "I live in a fast-growing city in the southeast US, where urban design and city planning are always a hot topic. As population density has increased, it's become apparent that Charlotte needs to make drastic and sweeping changes to accommodate the growing number of people living in the area.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1583",
      lang: "en",
      time_to_read: 7,
      listen_duration_estimate: 613,
    },
    3757081081: {
      item_id: "3757081081",
      resolved_id: "3757081081",
      given_url:
        "https://bigthink.com/the-learning-curve/3-rules-express-your-thoughts-clearly/",
      given_title:
        "3 rules to express your thoughts so that everyone will understand you",
      favorite: "0",
      status: "0",
      time_added: "1676034775",
      time_updated: "1676034775",
      time_read: "0",
      time_favorited: "0",
      sort_id: 23,
      resolved_title:
        "3 rules to express your thoughts so that everyone will understand you",
      resolved_url:
        "https://bigthink.com/the-learning-curve/3-rules-express-your-thoughts-clearly/",
      excerpt:
        "Maybe this sounds familiar: You’re expressing a difficult idea, thought, or feeling, and at the moment, it seems to be going well. Your audience is nodding at the appropriate beats. Your cadence has an uncharacteristic flow and eloquence.",
      is_article: "1",
      is_index: "0",
      has_video: "1",
      has_image: "1",
      word_count: "1089",
      lang: "en",
      time_to_read: 5,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2022/12/BT_thumb_template_mother-2.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 422,
    },
    3783373722: {
      item_id: "3783373722",
      resolved_id: "3783373722",
      given_url: "https://www.joshwcomeau.com/react/data-binding/",
      given_title: "Data binding in React: how to work with forms in React",
      favorite: "0",
      status: "0",
      time_added: "1676637634",
      time_updated: "1676637634",
      time_read: "0",
      time_favorited: "0",
      sort_id: 7,
      resolved_title: "Data Binding in React",
      resolved_url: "https://www.joshwcomeau.com/react/data-binding/",
      excerpt:
        "So you have a bit of state in React, and you want to sync it with a form field. How do you do it? Well, it depends on the type of form control: text inputs, selects, checkboxes, and radio buttons all work a little bit differently.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "2275",
      lang: "en",
      time_to_read: 10,
      top_image_url: "https://www.joshwcomeau.com/images/og-data-binding.jpg",
      listen_duration_estimate: 881,
    },
    3789371730: {
      item_id: "3789371730",
      resolved_id: "3789371730",
      given_url: "http://bigthink.com/13-8/quantum-mystery-interaction",
      given_title:
        "Quantum mystery: Do things only exist once we interact with them?",
      favorite: "0",
      status: "0",
      time_added: "1676466854",
      time_updated: "1676466854",
      time_read: "0",
      time_favorited: "0",
      sort_id: 13,
      resolved_title:
        "Quantum mystery: Do things only exist once we interact with them?",
      resolved_url: "https://bigthink.com/13-8/quantum-mystery-interaction/",
      excerpt:
        "This is the seventh in a series of articles exploring the birth of quantum physics. Perhaps the weirdest thing about the quantum world is that the notion of an object falls apart.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1225",
      lang: "en",
      time_to_read: 6,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/01/BT_thumb_template_mother-54.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 474,
    },
    3797725392: {
      item_id: "3797725392",
      resolved_id: "3797725392",
      given_url: "http://space.com/machine-learning-seti-technosignatures",
      given_title: "Machine learning spots 8 potential technosignatures",
      favorite: "0",
      status: "0",
      time_added: "1677066884",
      time_updated: "1677066884",
      time_read: "0",
      time_favorited: "0",
      sort_id: 2,
      resolved_title: "Machine learning spots 8 potential technosignatures",
      resolved_url:
        "https://www.space.com/machine-learning-seti-technosignatures",
      excerpt:
        'Humans have five new leads in the search to find life beyond our solar system. Scientists attempting to address the question, "Are we alone in the universe?" have used a new machine-learning technique to discover eight previously undetected "signals of interest" from around five nearby stars.',
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "956",
      lang: "en",
      time_to_read: 4,
      top_image_url:
        "https://cdn.mos.cms.futurecdn.net/WVBd7BEHP5tgL3JVteLZhQ-1200-80.jpg",
      domain_metadata: {
        name: "Space.com",
        logo: "https://logo.clearbit.com/space.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/space.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 370,
    },
    3798225017: {
      item_id: "3798225017",
      resolved_id: "3798225017",
      given_url:
        "https://www.newyorker.com/tech/annals-of-technology/whispers-of-ais-modular-future",
      given_title: "Whispers of A.I.’s Modular Future",
      favorite: "0",
      status: "0",
      time_added: "1675779861",
      time_updated: "1675779861",
      time_read: "0",
      time_favorited: "0",
      sort_id: 24,
      resolved_title: "Whispers of A.I.’s Modular Future",
      resolved_url:
        "https://www.newyorker.com/tech/annals-of-technology/whispers-of-ais-modular-future",
      excerpt:
        "One day in late December, I downloaded a program called Whisper.cpp onto my laptop, hoping to use it to transcribe an interview I’d done.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "2492",
      lang: "en",
      time_to_read: 11,
      top_image_url:
        "https://media.newyorker.com/photos/63d93e688b2aff35d30ef8e2/16:9/w_1280,c_limit/Somers_final.jpg",
      domain_metadata: {
        name: "The New Yorker",
        logo: "https://logo.clearbit.com/newyorker.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/newyorker.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 965,
    },
    3798458315: {
      item_id: "3798458315",
      resolved_id: "3798458315",
      given_url:
        "http://bigthink.com/13-8/quantum-entanglement-hidden-variable",
      given_title:
        "Could a hidden variable explain the weirdness of quantum physics?",
      favorite: "0",
      status: "0",
      time_added: "1676035039",
      time_updated: "1676035039",
      time_read: "0",
      time_favorited: "0",
      sort_id: 18,
      resolved_title:
        "Could a hidden variable explain the weirdness of quantum physics?",
      resolved_url:
        "https://bigthink.com/13-8/quantum-entanglement-hidden-variable/",
      excerpt:
        "This is the ninth in a series of articles exploring the birth of quantum physics. Over the past few weeks, we have explored some of the foundational concepts in quantum physics, from quantum jumps to superposition and well beyond.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1322",
      lang: "en",
      time_to_read: 6,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/02/quantum-entanglement_Web.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 512,
    },
    3799617386: {
      item_id: "3799617386",
      resolved_id: "3799617386",
      given_url: "http://bigthink.com/the-future/space-travel-spirituality",
      given_title:
        "Space travel will radically change human psychology and spirituality",
      favorite: "0",
      status: "0",
      time_added: "1677066988",
      time_updated: "1677066988",
      time_read: "0",
      time_favorited: "0",
      sort_id: 0,
      resolved_title:
        "Space travel will radically change human psychology and spirituality",
      resolved_url:
        "https://bigthink.com/the-future/space-travel-spirituality/",
      excerpt:
        "Humans have lived on Earth for millennia, but one day that will change. The stars are calling us, and their pull is far too strong for us to ignore. We have already put our feet on the Moon; one day we will be back. Then perhaps we will head to Mars and beyond. When we do, it will change us.",
      is_article: "1",
      is_index: "0",
      has_video: "1",
      has_image: "1",
      word_count: "1659",
      lang: "en",
      time_to_read: 8,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/02/AdobeStock_558949687.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 642,
    },
    3800073154: {
      item_id: "3800073154",
      resolved_id: "3800073154",
      given_url:
        "http://theguardian.com/books/2023/feb/04/think-yourself-better-10-rules-of-philosophy-to-live-by",
      given_title: "Think yourself better: 10 rules of philosophy to live by",
      favorite: "0",
      status: "0",
      time_added: "1675638261",
      time_updated: "1675638261",
      time_read: "0",
      time_favorited: "0",
      sort_id: 26,
      resolved_title:
        "Think yourself better: 10 rules of philosophy to live by",
      resolved_url:
        "https://www.theguardian.com/books/2023/feb/04/think-yourself-better-10-rules-of-philosophy-to-live-by",
      excerpt:
        "The thing that separates human beings from other animals is our extraordinary capacity for complex, abstract thought. This is what has given rise to our diverse cultures, our scientific achievements, our ability to envisage the future and, hopefully, make it better than what has gone before.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "2484",
      lang: "en",
      time_to_read: 11,
      amp_url:
        "https://amp.theguardian.com/books/2023/feb/04/think-yourself-better-10-rules-of-philosophy-to-live-by",
      top_image_url:
        "https://i.guim.co.uk/img/media/9f79459077db6a075b792612c020212ebda2a2e0/0_1023_3151_1890/master/3151.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=400059af09234535f65afd1be1b1db0b",
      domain_metadata: {
        name: "The Guardian",
        logo: "https://logo.clearbit.com/theguardian.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/theguardian.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 962,
    },
    3801334305: {
      item_id: "3801334305",
      resolved_id: "3801334305",
      given_url: "http://space.com/rotating-universe-would-permit-time-travel",
      given_title:
        "Do we live in a rotating universe? If we did, we could travel back in time",
      favorite: "0",
      status: "0",
      time_added: "1676034977",
      time_updated: "1676034977",
      time_read: "0",
      time_favorited: "0",
      sort_id: 20,
      resolved_title:
        "Do we live in a rotating universe? If we did, we could travel back in time",
      resolved_url:
        "https://www.space.com/rotating-universe-would-permit-time-travel",
      excerpt:
        "We know that planets rotate, but what about the universe as a whole? No, the universe doesn't appear to rotate; if it did, time travel into the past might be possible.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "918",
      lang: "en",
      time_to_read: 4,
      top_image_url:
        "https://cdn.mos.cms.futurecdn.net/AWcavUASABGqVnMnFeBJNS-1200-80.jpg",
      domain_metadata: {
        name: "Space.com",
        logo: "https://logo.clearbit.com/space.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/space.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 355,
    },
    3801395872: {
      item_id: "3801395872",
      resolved_id: "3801395872",
      given_url:
        "http://quantamagazine.org/how-our-reality-may-be-a-sum-of-all-possible-realities-20230206",
      given_title: "How Our Reality May Be a Sum of All Possible Realities",
      favorite: "0",
      status: "0",
      time_added: "1676034891",
      time_updated: "1676034891",
      time_read: "0",
      time_favorited: "0",
      sort_id: 22,
      resolved_title: "How Our Reality May Be a Sum of All Possible Realities",
      resolved_url:
        "https://www.quantamagazine.org/how-our-reality-may-be-a-sum-of-all-possible-realities-20230206/",
      excerpt:
        "Richard Feynman’s path integral is both a powerful prediction machine and a philosophy about how the world is. But physicists are still struggling to figure out how to use it, and what it means.",
      is_article: "1",
      is_index: "0",
      has_video: "1",
      has_image: "1",
      word_count: "1907",
      lang: "en",
      time_to_read: 9,
      top_image_url:
        "https://d2r55xnwy6nx47.cloudfront.net/uploads/2023/02/PathIntegralExplainer-byKristinaArmitage-Social.webp",
      domain_metadata: {
        name: "Quanta Magazine",
        logo: "https://logo.clearbit.com/quantamagazine.org?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/quantamagazine.org?size=800&greyscale=true",
      },
      listen_duration_estimate: 738,
    },
    3801402567: {
      item_id: "3801402567",
      resolved_id: "3801402567",
      given_url: "http://inverse.com/science/jwst-first-galaxies",
      given_title:
        "How the Webb Telescope is Rewriting What We Know About the Early Universe, ",
      favorite: "0",
      status: "0",
      time_added: "1676034944",
      time_updated: "1676034944",
      time_read: "0",
      time_favorited: "0",
      sort_id: 21,
      resolved_title:
        "How the Webb Telescope is Rewriting What We Know About the Early Universe, One Galaxy at a Time",
      resolved_url: "https://www.inverse.com/science/jwst-first-galaxies",
      excerpt:
        "At some point, the first stars formed. Then came small galaxies. Like a celestial Macondo, each galaxy became a hometown for stellar family trees. When these ancestors receded away in an expanding Universe, their light stretched into obscurity, and only now have astronomers begun to see them.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1878",
      lang: "en",
      time_to_read: 9,
      top_image_url:
        "https://imgix.bustle.com/uploads/shutterstock/2023/2/3/7d293cca-4d90-468f-ad1d-d73bee5e7782-shutterstock-2177538711.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
      domain_metadata: {
        name: "Inverse",
        logo: "https://logo.clearbit.com/inverse.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/inverse.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 727,
    },
    3801529742: {
      item_id: "3801529742",
      resolved_id: "3801529742",
      given_url:
        "http://theverge.com/2023/2/6/23588099/seti-machine-learning-extraterrestrial-intelligence-study",
      given_title:
        "Machine learning could turbocharge the search for extraterrestrial intellig",
      favorite: "0",
      status: "0",
      time_added: "1676466750",
      time_updated: "1676466750",
      time_read: "0",
      time_favorited: "0",
      sort_id: 15,
      resolved_title:
        "Machine learning could turbocharge the search for extraterrestrial intelligence",
      resolved_url:
        "https://www.theverge.com/2023/2/6/23588099/seti-machine-learning-extraterrestrial-intelligence-study",
      excerpt:
        "The field of SETI, or the search for extraterrestrial intelligence, is accelerating to new heights thanks to developments in machine learning.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "845",
      lang: "en",
      time_to_read: 4,
      top_image_url:
        "https://cdn.vox-cdn.com/thumbor/LSZIa0C7uTGG9Wwe_v2iv1cXo0w=/0x0:1024x735/1200x628/filters:focal(512x368:513x369)/cdn.vox-cdn.com/uploads/chorus_asset/file/24091189/hubble_palate_.jpeg",
      domain_metadata: {
        name: "The Verge",
        logo: "https://logo.clearbit.com/theverge.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/theverge.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 327,
    },
    3802292523: {
      item_id: "3802292523",
      resolved_id: "3802292523",
      given_url:
        "https://www.bbc.com/travel/article/20230207-the-five-countries-expat-families-love",
      given_title: "",
      favorite: "0",
      status: "0",
      time_added: "1676915065",
      time_updated: "1676915068",
      time_read: "0",
      time_favorited: "0",
      sort_id: 5,
      resolved_title: "The five countries emigrating families love",
      resolved_url:
        "https://www.bbc.com/travel/article/20230207-the-five-countries-expat-families-love",
      excerpt:
        "For people looking to relocate, rankings of the world's most liveable countries can be helpful. But with kids in tow, there are more factors to weigh than, say, average income or economic stability.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "2007",
      lang: "en",
      time_to_read: 9,
      top_image_url: "https://ychef.files.bbci.co.uk/live/624x351/p0f1h9db.jpg",
      domain_metadata: {
        name: "BBC",
        logo: "https://logo.clearbit.com/bbc.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bbc.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 777,
    },
    3802356354: {
      item_id: "3802356354",
      resolved_id: "3802356354",
      given_url:
        "http://theconversation.com/chatgpt-is-a-data-privacy-nightmare-if-youve-ever-posted-online-you-ought-to-be-concerned-199283",
      given_title:
        "ChatGPT is a data privacy nightmare. If you’ve ever posted online, you ough",
      favorite: "0",
      status: "0",
      time_added: "1676466764",
      time_updated: "1676466764",
      time_read: "0",
      time_favorited: "0",
      sort_id: 14,
      resolved_title:
        "ChatGPT is a data privacy nightmare. If you’ve ever posted online, you ought to be concerned",
      resolved_url:
        "https://theconversation.com/chatgpt-is-a-data-privacy-nightmare-if-youve-ever-posted-online-you-ought-to-be-concerned-199283",
      excerpt:
        "ChatGPT has taken the world by storm. Within two months of its release it reached 100 million active users, making it the fastest-growing consumer application ever launched.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "893",
      lang: "en",
      time_to_read: 4,
      amp_url:
        "https://theconversation.com/amp/chatgpt-is-a-data-privacy-nightmare-if-youve-ever-posted-online-you-ought-to-be-concerned-199283",
      top_image_url:
        "https://images.theconversation.com/files/508567/original/file-20230207-13-uu7jfn.jpeg?ixlib=rb-1.1.0&rect=8%2C565%2C5982%2C2991&q=45&auto=format&w=1356&h=668&fit=crop",
      domain_metadata: {
        name: "The Conversation",
        logo: "https://logo.clearbit.com/theconversation.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/theconversation.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 346,
    },
    3802489706: {
      item_id: "3802489706",
      resolved_id: "3802489706",
      given_url:
        "http://bigthink.com/starts-with-a-bang/quantum-reason-neutral-atoms",
      given_title: "The quantum reason why neutral atoms first formed",
      favorite: "0",
      status: "0",
      time_added: "1676034993",
      time_updated: "1676034993",
      time_read: "0",
      time_favorited: "0",
      sort_id: 19,
      resolved_title: "The quantum reason why neutral atoms first formed",
      resolved_url:
        "https://bigthink.com/starts-with-a-bang/quantum-reason-neutral-atoms/",
      excerpt:
        "In order for you to exist, a lot of things had to happen beforehand. Planet Earth needed to come into existence, complete with the organic ingredients from which life could arise.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "2279",
      lang: "en",
      time_to_read: 10,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2022/04/13-8_Quantum-Time_Lead.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 882,
    },
    3802819284: {
      item_id: "3802819284",
      resolved_id: "3802819284",
      given_url: "http://bigthink.com/13-8/quantum-mechanics-philosophy",
      given_title:
        "The weirdness of quantum mechanics forces scientists to confront philosophy",
      favorite: "0",
      status: "0",
      time_added: "1677066984",
      time_updated: "1677066984",
      time_read: "0",
      time_favorited: "0",
      sort_id: 1,
      resolved_title:
        "The weirdness of quantum mechanics forces scientists to confront philosophy",
      resolved_url: "https://bigthink.com/13-8/quantum-mechanics-philosophy/",
      excerpt:
        "This is the tenth and final article in a series exploring the birth of quantum physics. The world of the very small is like nothing we see in our everyday lives. We do not think of people or rocks being in more than one place at the same time until we look at them.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1569",
      lang: "en",
      time_to_read: 7,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/02/atom.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 607,
    },
    3803383023: {
      item_id: "3803383023",
      resolved_id: "3803383023",
      given_url:
        "http://bigthink.com/thinking/why-carl-sagan-believed-that-science-is-a-source-of-spirituality",
      given_title:
        "Why Carl Sagan believed that science is a source of spirituality",
      favorite: "0",
      status: "0",
      time_added: "1676035064",
      time_updated: "1676035064",
      time_read: "0",
      time_favorited: "0",
      sort_id: 17,
      resolved_title:
        "Why Carl Sagan believed that science is a source of spirituality",
      resolved_url:
        "https://bigthink.com/thinking/why-carl-sagan-believed-that-science-is-a-source-of-spirituality/",
      excerpt:
        "Excerpted with permission from The Romance of Reality by Bobby Azarian, published by BenBella Books in 2022. Many assume that when you get down to the nuts and bolts of nature, a spiritual worldview is simply incompatible with a scientific one.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1209",
      lang: "en",
      time_to_read: 5,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/02/AdobeStock_566878165_3200x1800.jpeg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 468,
    },
    3803809203: {
      item_id: "3803809203",
      resolved_id: "3803809203",
      given_url:
        "http://bigthink.com/starts-with-a-bang/timeline-of-our-universe",
      given_title: "Ask Ethan: How do we know the timeline of our Universe?",
      favorite: "0",
      status: "0",
      time_added: "1676466906",
      time_updated: "1676466906",
      time_read: "0",
      time_favorited: "0",
      sort_id: 12,
      resolved_title: "Ask Ethan: How do we know the timeline of our Universe?",
      resolved_url:
        "https://bigthink.com/starts-with-a-bang/timeline-of-our-universe/",
      excerpt:
        "Today, it’s now 13.8 billion years since the Big Bang occurred. Our observable Universe extends for 46.1 billion light-years in all directions, and is made of: If we were to run the clock backward, however, we’d find that dark energy wasn’t always dominant.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "2427",
      lang: "en",
      time_to_read: 11,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/02/02-earliest-stars_3x2.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 939,
    },
    3804005746: {
      item_id: "3804005746",
      resolved_id: "3804005746",
      given_url:
        "http://zdnet.com/article/chatgpt-productivity-hacks-five-ways-to-use-chatbots-to-make-your-life-easier",
      given_title:
        "ChatGPT productivity hacks: Five ways to use chatbots to make your life eas",
      favorite: "0",
      status: "0",
      time_added: "1676214749",
      time_updated: "1676214749",
      time_read: "0",
      time_favorited: "0",
      sort_id: 16,
      resolved_title:
        "ChatGPT productivity hacks: Five ways to use chatbots to make your life easier",
      resolved_url:
        "https://www.zdnet.com/article/chatgpt-productivity-hacks-five-ways-to-use-chatbots-to-make-your-life-easier/",
      excerpt:
        "ChatGPT has made headlines because of its advanced coding, writing, and chatting capabilities. The chatbot has proven itself to have a wide range of skills -- from fixing bugs to passing an MBA exam.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "893",
      lang: "en",
      time_to_read: 4,
      amp_url:
        "https://www.zdnet.com/google-amp/article/chatgpt-productivity-hacks-five-ways-to-use-chatbots-to-make-your-life-easier/",
      top_image_url:
        "https://www.zdnet.com/a/img/resize/4d14ab243629870b6c492855d68ac14ad1a62c75/2023/02/08/eb7fb94f-9915-43d0-b6f5-4ca0417fd98a/gettyimages-1256204410.jpg?auto=webp&fit=crop&height=675&width=1200",
      domain_metadata: {
        name: "ZDNet",
        logo: "https://logo.clearbit.com/zdnet.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/zdnet.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 346,
    },
    3805134014: {
      item_id: "3805134014",
      resolved_id: "3805134014",
      given_url:
        "http://wired.com/story/how-to-not-accidentally-share-your-location",
      given_title:
        "How to Make Sure You’re Not Accidentally Sharing Your Location",
      favorite: "0",
      status: "0",
      time_added: "1676545852",
      time_updated: "1676545852",
      time_read: "0",
      time_favorited: "0",
      sort_id: 9,
      resolved_title:
        "How to Make Sure You’re Not Accidentally Sharing Your Location",
      resolved_url:
        "https://www.wired.com/story/how-to-not-accidentally-share-your-location/",
      excerpt:
        "Your devices and apps really, really want to know where you are—whether it's to tell you the weather, recommend some restaurants you might like, or better target advertising at you. Managing what you're sharing and what you're not sharing, and when, can quickly get confusing.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1242",
      lang: "en",
      time_to_read: 6,
      amp_url:
        "https://www.wired.com/story/how-to-not-accidentally-share-your-location/amp",
      top_image_url:
        "https://media.wired.com/photos/63e6a368de5e9cf54ad7745c/191:100/w_1280,c_limit/How-to-Make-Sure-You're-Not-Sharing-Location-Featured-Gear.jpg",
      domain_metadata: {
        name: "WIRED",
        logo: "https://logo.clearbit.com/wired.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/wired.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 481,
    },
    3806315472: {
      item_id: "3806315472",
      resolved_id: "3806315472",
      given_url:
        "http://fastcompany.com/90847103/how-nonlinear-workday-help-get-more-done",
      given_title: "How a nonlinear workday might help you get more done",
      favorite: "0",
      status: "0",
      time_added: "1676985860",
      time_updated: "1676985860",
      time_read: "0",
      time_favorited: "0",
      sort_id: 4,
      resolved_title: "How a nonlinear workday might help you get more done",
      resolved_url:
        "https://www.fastcompany.com/90847103/how-nonlinear-workday-help-get-more-done",
      excerpt:
        "It’s about working according to your natural energy levels, and not forcing yourself to be productive. 3 minute ReadA traditional workday is still 9 to 5, or something close to it.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "0",
      word_count: "772",
      lang: "en",
      time_to_read: 4,
      top_image_url:
        "https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2023/02/p-1-90847103-how-nonlinear-workday-help-get-more-done.jpg",
      domain_metadata: {
        name: "Fast Company",
        logo: "https://logo.clearbit.com/fastcompany.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/fastcompany.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 299,
    },
    3806360737: {
      item_id: "3806360737",
      resolved_id: "3806360737",
      given_url:
        "http://technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language",
      given_title:
        "How Rust went from a side project to the world’s most-loved programming lan",
      favorite: "0",
      status: "0",
      time_added: "1676545834",
      time_updated: "1676545834",
      time_read: "0",
      time_favorited: "0",
      sort_id: 10,
      resolved_title:
        "How Rust went from a side project to the world’s most-loved programming language",
      resolved_url:
        "https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/",
      excerpt:
        "Many software projects emerge because—somewhere out there—a programmer had a personal problem to solve. That’s more or less what happened to Graydon Hoare. In 2006, Hoare was a 29-year-old computer programmer working for Mozilla, the open-source browser company.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "3122",
      lang: "en",
      time_to_read: 14,
      amp_url:
        "https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/amp/",
      top_image_url:
        "https://wp.technologyreview.com/wp-content/uploads/2023/02/jinhwajang_c2.jpg?resize=1200,600",
      domain_metadata: {
        name: "MIT Technology Review",
        logo: "https://logo.clearbit.com/technologyreview.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/technologyreview.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 1209,
    },
    3808573041: {
      item_id: "3808573041",
      resolved_id: "3808573041",
      given_url:
        "http://bigthink.com/the-future/brief-history-innovations-that-werent",
      given_title:
        "Overhyped and never delivered: A brief history of innovations that weren’t",
      favorite: "0",
      status: "0",
      time_added: "1676985898",
      time_updated: "1676985898",
      time_read: "0",
      time_favorited: "0",
      sort_id: 3,
      resolved_title:
        "Overhyped and never delivered: A brief history of innovations that weren’t",
      resolved_url:
        "https://bigthink.com/the-future/brief-history-innovations-that-werent/",
      excerpt:
        "Excerpted from Invention and Innovation: A Brief History of Hype and Failure by Vaclav Smil. Reprinted with permission from The MIT Press. Copyright 2023. All rights reserved.",
      is_article: "1",
      is_index: "0",
      has_video: "0",
      has_image: "1",
      word_count: "1440",
      lang: "en",
      time_to_read: 7,
      top_image_url:
        "https://bigthink.com/wp-content/uploads/2023/02/9323969398_2cbdef104a_o.jpg?resize=1200,630",
      domain_metadata: {
        name: "Big Think",
        logo: "https://logo.clearbit.com/bigthink.com?size=800",
        greyscale_logo:
          "https://logo.clearbit.com/bigthink.com?size=800&greyscale=true",
      },
      listen_duration_estimate: 557,
    },
  },
  error: null,
  search_meta: { search_type: "normal" },
  since: 1677067052,
};
