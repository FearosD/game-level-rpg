export default class SaveModel {
  constructor() {
    this.url = process.env.SAVE_URL;
  }

  async getSaves() {
    const request = await fetch(this.url);
    const saves = await request.json();
    return saves;
  }

  async getSave(saveName) {
    const saves = await this.getSaves();
    const [save] = saves.filter(({ saveSlot }) => saveSlot === saveName);
    return save;
  }

  async postSave(saveData, saveName) {
    const data = { saveSlot: saveName, saveData };
    const save = await this.getSave(saveName);

    if (save === undefined) {
      const request = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await request.json();
    } else {
      const request = await fetch(`${this.url}/${save.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data }),
      });
      return await request.json();
    }
  }
}
