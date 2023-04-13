import createElement from '../../helpers/createElement';

export default function infoStats(stat, statValue) {
  const textStat = stat[0].toUpperCase() + stat.slice(1);
  const infoStats = createElement({
    classElem: 'info__stats',
    innerElem: `<div class="info__stats-icon info__stats-icon--${stat.replace(
      ' ',
      '-'
    )}"></div>
                <div class="info__stats-description">${textStat}: ${statValue}</div>`,
  });

  return infoStats;
}
