import featuresAt from './features_at.js';
import * as Constants from '../constants.js';

export default function getFeatureAtAndSetCursors(event, ctx) {
  const features = featuresAt.click(event, null, ctx);
  const classes = { mouse: Constants.cursors.NONE };

  if (features[0]) {
    const isActive = features[0].properties.active === Constants.activeStates.ACTIVE;
    const mode = ctx.events.currentModeName();
    // simple_select: no drag, so use pointer even over selected features
    // No whole-feature drag in simple_select or direct_select: use pointer over active features
    if (isActive && (mode === Constants.modes.SIMPLE_SELECT || mode === Constants.modes.DIRECT_SELECT)) {
      classes.mouse = Constants.cursors.POINTER;
    } else if (isActive) {
      classes.mouse = Constants.cursors.MOVE;
    } else {
      classes.mouse = Constants.cursors.POINTER;
    }
    classes.feature = features[0].properties.meta;
  }

  if (ctx.events.currentModeName().indexOf('draw') !== -1) {
    classes.mouse = Constants.cursors.ADD;
  }

  ctx.ui.queueMapClasses(classes);
  ctx.ui.updateMapClasses();

  return features[0];
}
