import { VantComponent } from '../common/component'
import { transition } from '../mixins/transition'
import { iphonex } from '../mixins/iphonex'

VantComponent({
  mixins: [transition(false), iphonex],
  props: {
    transition: String,
    customStyle: String,
    overlayStyle: String,
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    }
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.$emit('close');
      }
    }
  }
});
