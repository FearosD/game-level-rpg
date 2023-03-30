const dialogues = {
  benjamin: {
    npc: 'Benjamin',
    start: {
      name: 'benjamin',
      text: "Hello, traveler. I am the headman of this village. Do you know what's going on here?",
      next: 'message-1',
      answers: [
        // { text: 'Test answer 1', next: 'message-1' },
        // { text: 'Test answer 2', next: 'message-2' },
      ],
    },
    'message-1': {
      name: 'player',
      text: 'Yes, I heard that the residents left the village because of some incident.',
      next: 'message-2',
      answers: [],
    },
    'message-2': {
      name: 'benjamin',
      text: "Yes, it's true. We have been living in fear of the dungeon for several months and hope for salvation. Can you help us?",
      next: '',
      answers: [
        { text: 'Of course, I am ready to help.', next: 'message-3' },
        { text: 'I need to think.', next: 'message-4' },
      ],
    },
    'message-3': {
      name: 'benjamin',
      text: 'Great, I am very grateful for your help. The dungeon is to the east of here. Be careful, there are many dangers there.',
      next: 'message-5',
      answers: [],
    },
    'message-4': {
      name: 'benjamin',
      text: 'I understand that this is not an easy decision. But here not only our village is in danger, but also the whole neighborhood. Please consider your decision as soon as possible.',
      next: 'message-5',
      answers: [],
    },
    'message-5': {
      name: 'player',
      text: 'Hmm... I need more information.',
      next: '',
      answers: [
        {
          text: 'What dangers can be encountered on the way?',
          next: 'message-6',
        },
        {
          text: 'What kind of reward will I have for my help?',
          next: 'message-7',
        },
      ],
    },
    'message-6': {
      name: 'benjamin',
      text: "The dungeon is inhabited by various monsters and traps. But the most dangerous thing is the main villain who controls all these creatures. There were rumors that he wasn't human.",
      next: 'message-8',
      answers: [],
    },
    'message-7': {
      name: 'benjamin',
      text: 'I understand that you are not ready to risk your life for free. I offer you a generous reward if you can defeat the main villain and clear the dungeon of dangers.',
      next: 'message-8',
      answers: [],
    },
    'message-8': {
      name: 'player',
      text: 'Okay, I get it.',
      next: 'final',
      answers: [],
    },
    final: {
      name: 'benjamin',
      text: 'Be careful and good luck to you.',
      next: '',
      answers: [],
    },
  },
};

export default dialogues;
